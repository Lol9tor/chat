import React from 'react'

export default function (props) {
    const currentUserClass = props.user.username === props.msg.username ? 'currentUser': '',
        dateString = (new Date(props.msg.timestamp)).toLocaleTimeString();

    return <div className={`message ${currentUserClass}`}>
        <div><b>{props.msg.username}</b> [<i>{dateString}</i>]</div>
        <div>{props.msg.message}</div>
    </div>
}