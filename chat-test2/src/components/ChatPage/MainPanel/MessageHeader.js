import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';


function MessageHeader({ handleSearchChange }) {
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);

    return (
        <div style={{
            width: '100%',
            height: '110px',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '2rem',
            marginBottom: '1rem'
        }} >
            <Container>
                <Row>
                    <Col>
                        <h2>
                            {chatRoom && chatRoom.name}
                        </h2>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <AiOutlineSearch />
                            </InputGroup.Text>
                            <FormControl
                                onChange={handleSearchChange}
                                placeholder="Search Messages"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default MessageHeader;
