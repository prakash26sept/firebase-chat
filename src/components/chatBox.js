import React, { useEffect, useState } from 'react';
import fire from '../configuration/config';

import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
    },

    main: {
        width: '80%',
        display: 'flex',
        margin: 'auto',
        marginTop: '50px',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        border: '2px solid grey',
        borderRadius: '5px',
        justifyContent: 'center'
    },
    chatDiv: {
        marginTop: '20px',
        color: 'purple',
        '&>div': {
            margin: '10px',
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    chatHeading: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        marginBottom: '10px'
    },
    chatBoxMain: {
        // margin: '10px 0',
        lineHeight: '26px'
    },
    send: {
        '&:hover': {
            cursor: 'pointer',
        },
        backgroundColor: 'black',
        color: 'white',
        padding: '5px'
    },
    inputMessage: {
        padding: '5px',
        width: '100%'
    },
    chatOne: {
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    chatInfo: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    sendDiv: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    msg: {
        color: 'purple'
    },
    grey: {
        color: 'grey'
    }

}));



function useChat() {
    const [chat, setChat] = useState([])

    useEffect(() => {
        fire.firestore().collection('chats').onSnapshot((snapshot) => {
            const newChat = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setChat(newChat);
        })
    }, [])
    return chat
}

function ChatBox(props) {

    const classes = style();
    const chats = useChat();
    const [message, setMessage] = useState('');
    const email = props.email;
    console.log(email);

    const sendMessage = () => {
        fire.firestore().collection('chats').add({
            name: email,
            message: message,
            time: new Date().toLocaleString()
        })
    }

    return (
        <React.Fragment>
            <div className={classes.chatBoxMain}>
                <div className={classes.chatHeading}>Chat</div>

                {chats.map((chat) => {
                    return (
                        <div key={chat.id} className={classes.chatOne}>
                            <div className={classes.msg}>Msg: {chat.message}</div>
                            <div className={classes.chatInfo}>
                                <div>By: {chat.name} </div>
                                <div className={classes.grey}> Time: {chat.time}</div>
                            </div>
                        </div>
                    )
                })}


                <div className={classes.sendDiv}>
                    <input className={classes.inputMessage} value={message} onChange={e => setMessage(e.currentTarget.value)} type="text" placeholder="Your message" />
                    <span onClick={sendMessage} className={classes.send}> Send</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChatBox;