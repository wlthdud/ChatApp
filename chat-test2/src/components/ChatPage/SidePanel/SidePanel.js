import React from 'react'
import UserPanel from './UserPanel';
import DirectMessages from './DirectMessages';

function SidePanel() {
    return (
        <div
            style={{
                backgroundColor: "rgb(234, 243, 230)",
                padding: '2rem',
                minHeight: '100vh',
                color: 'black',
                minWidth: '275px'
            }}
        >
            <UserPanel />

            <DirectMessages />
        </div>
    )
}

export default SidePanel
