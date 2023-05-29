import React from 'react'
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";

function UserPanel() {
    const user = useSelector(state => state.user.currentUser)
    console.log("selector",user);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            {/* Logo */}
            <h3 style={{marginBottom:'30px'}}>
                <IoIosChatboxes />{" "} Chat App
            </h3>

            <div style={{ display: 'flex', marginBottom: '30px' }}>
                <Image src={user && user.photoURL}
                    style={{ width: '30p', height: '30px', marginTop: '3px' }}
                    roundedCircle />

                <Dropdown>
                    <Dropdown.Toggle
                        style={{ background: 'transparent', border: '0px', color: 'black', }}
                        id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>
                            로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserPanel
