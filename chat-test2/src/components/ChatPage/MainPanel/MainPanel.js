import React, { Component } from 'react'
import MessageHeader from './MessageHeader';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import { setUserPosts } from '../../../redux/actions/chatRoom_action';
import Skeleton from '../../../commons/components/Skeleton';
import { getDatabase, ref, onChildAdded, onChildRemoved, child, off } from "firebase/database";

export class MainPanel extends Component {

    messageEndRef = React.createRef();

    state = {
        messages: [],
        messagesRef: ref(getDatabase(), "messages"),
        messagesLoading: true,
        searchTerm: "",
        searchResults: [],
        searchLoading: false,
        typingRef: ref(getDatabase(), "typing"),
        typingUsers: [],
        listenerLists: []
    }

    componentDidMount() {
        const { chatRoom } = this.props;

        if (chatRoom) {
            this.addMessagesListeners(chatRoom.id)
            this.addTypingListeners(chatRoom.id)
        }
    }

    componentDidUpdate() {
        if (this.messageEndRef) {
            this.messageEndRef.scrollIntoView({ behavior: "smooth" })
        }
    }

    componentWillUnmount() {
        // ref(getDatabase(), "messages")
        off(this.state.messagesRef);
        this.removeListeners(this.state.listenerLists);
    }

    removeListeners = (listeners) => {
        listeners.forEach(listner => {
            off(ref(getDatabase(), `messages/${listner.id}`), listner.event);
        })
    }

    addTypingListeners = (chatRoomId) => {
        let typingUsers = [];
        //typing이 새로 들어올 때
        let { typingRef } = this.state;

        onChildAdded(child(typingRef, chatRoomId), DataSnapshot => {
            if (DataSnapshot.key !== this.props.user.uid) {
                typingUsers = typingUsers.concat({
                    id: DataSnapshot.key,
                    name: DataSnapshot.val()
                });
                this.setState({ typingUsers })
            }
        })

        //listenersList state에 등록된 리스너를 넣어주기 
        this.addToListenerLists(chatRoomId, this.state.typingRef, "child_added")

        //typing을 지워줄 때
        onChildRemoved(child(typingRef, chatRoomId), DataSnapshot => {
            const index = typingUsers.findIndex(user => user.id === DataSnapshot.key);
            if (index !== -1) {
                typingUsers = typingUsers.filter(user => user.id !== DataSnapshot.key);
                this.setState({ typingUsers })
            }
        })

        //listenersList state에 등록된 리스너를 넣어주기 
        this.addToListenerLists(chatRoomId, this.state.typingRef, "child_removed")

    }

    addToListenerLists = (id, ref, event) => {

        //이미 등록된 리스너인지 확인 
        const index = this.state.listenerLists.findIndex(listener => {
            return (
                listener.id === id &&
                listener.ref === ref &&
                listener.event === event
            );
        })

        if (index === -1) {
            const newListener = { id, ref, event }
            this.setState({
                listenerLists: this.state.listenerLists.concat(newListener)
            })
        }
    }

    handleSearchMessages = () => {
        const chatRoomMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, "gi");
        const searchResults = chatRoomMessages.reduce((acc, message) => {
            if (
                (message.content && message.content.match(regex)) ||
                message.user.name.match(regex)
            ) {
                acc.push(message)
            }
            return acc;
        }, [])
        this.setState({ searchResults })
    }

    handleSearchChange = event => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        },
            () => this.handleSearchMessages()
        )
    }

    addMessagesListeners = (chatRoomId) => {

        let messagesArray = [];

        let { messagesRef } = this.state;

        onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {

            messagesArray.push(DataSnapshot.val());
            this.setState({
                messages: messagesArray,
                messagesLoading: false
            })
            this.userPostsCount(messagesArray)
        })

    }

    userPostsCount = (messages) => {
        let userPosts = messages.reduce((acc, message) => {
            if (message.user.name in acc) {
                acc[message.user.name].count += 1;
            } else {
                acc[message.user.name] = {
                    image: message.user.image,
                    count: 1
                }
            }
            return acc;
        }, {})
        this.props.dispatch(setUserPosts(userPosts))
    }

    renderMessages = (messages) =>
        messages.length > 0 &&
        messages.map(message => (
            <Message
                key={message.timestamp}
                message={message}
                user={this.props.user}
            />
        ))

    renderTypingUsers = (typingUsers) => {
        return (typingUsers.length > 0 &&
            typingUsers.map(user => (
                <span>{user.name.userUid}님이 채팅을 입력하고 있습니다...</span>
            )))
    }

    renderMessageSkeleton = (loading) =>
        loading && (
            <>
                {[...Array(10)].map((v, i) => (
                    <Skeleton key={i} />
                ))}
            </>
        )

    render() {
        const { messages, searchTerm, searchResults, typingUsers, messagesLoading } = this.state;
        return (
            <div style={{ padding: '2rem 2rem 0 2rem' }}>

                <MessageHeader handleSearchChange={this.handleSearchChange} />

                <div style={{
                    width: '100%',
                    height: '450px',
                    border: '.2rem solid #ececec',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto'
                }}>

                    {this.renderMessageSkeleton(messagesLoading)}

                    {searchTerm ?
                        this.renderMessages(searchResults)
                        :
                        this.renderMessages(messages)
                    }

                    {this.renderTypingUsers(typingUsers)}
                    <div ref={node => (this.messageEndRef = node)} />

                </div>

                <MessageForm />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        chatRoom: state.chatRoom.currentChatRoom
    }
}

export default connect(mapStateToProps)(MainPanel)
