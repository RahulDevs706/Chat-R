import React from 'react';
import './UserBox.css';

const UserBox = ({name}) => {
    return (
        <div className="userBox">
            <h2>{name}</h2>
        </div>
    )
}

export default UserBox
