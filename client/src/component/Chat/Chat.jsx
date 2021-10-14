// importing from react libraries
import React, { useEffect, useState, useContext} from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIo from "socket.io-client";

// importing components
import {user} from '../Join/Join';
import Message from '../Message/Message'; 
import UserBox from './UserBox';
import MoreTab from './MoreTab';

// importing context
import { MessageContext } from '../../context/MessageContext';

// importing icons
import {IconButton} from '@mui/material';
import { useMediaQuery } from 'react-responsive' 
import { FiMenu } from "react-icons/fi";
import {IconContext} from "react-icons"
import {AiOutlineClose as Close} from 'react-icons/ai'

// importing images
import img from '../../images/send.png'

// importing css
import './Chat.css'


// configuring global vars
let socket ;
const ENDPOINT= "adress where your server is hosted if its in localhost, uncomment the below one or if its hosted somewhere else paste the link here";
// const ENDPOINT = "http://localhost:4000"

const Chat = () => {

// media queries
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 840px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 840px)' })

// taking data from context
    const {messages, setMsgs} = useContext(MessageContext);

// required state hooks
    const [activeUser, setActiveUser] = useState([]);
    const [id, setId] = useState("")
    const [isShown, setIsShown]= useState(false)

   

// send msg function
    const send=()=>{
        const message = document.getElementById('chatInput').value
        socket.emit('message', {message, id});
        document.getElementById('chatInput').value="";

    }
// useEffect for socket connection
    useEffect(() => {
        socket = socketIo(ENDPOINT, {transports:['websocket']}) ;

        socket.on('connect', ()=>{
            setId(socket.id);
        })

        socket.emit('joinned', {user, id})

        socket.on('welcome', (data)=>{
            setMsgs((m)=>{return [...m, data]});;
        });

        socket.on('userJoined', (data)=>{
            setMsgs((m)=>{return [...m, data]});;
        });

        socket.on('roomData', (data)=>{
            setActiveUser(data?.usersInRoom);
        })

        socket.on('leave',(data)=>{
            setMsgs((m)=>{ return [...m, data]});
        });

        socket.on('userLeft', (data)=>{
            setActiveUser(data?.usersInRoom);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

// useEffect for getting sent msgs from server
    useEffect(() => {
        socket.on("sendMsg",(data)=>{
            setMsgs((m)=>{ return [...m, data]});
        })
        return () => {
            socket.off();
        }
    }, [])



    return (
        <div className="chatPage">
            <IconContext.Provider value={{color:"#fff"}}>
                <div className="chatCont">
                    <div className="chatBar">
                        <div className="header">
                            {isTabletOrMobile&& <IconButton><h2 onClick={()=>setIsShown(!isShown)}><FiMenu /></h2></IconButton>}
                            <h2>Chat-R</h2>
                            <IconButton><h2> <a href="/"><Close /></a></h2></IconButton>
                        </div>

                        {isTabletOrMobile&& <MoreTab array={activeUser} sideBar={isShown} setSideBar={setIsShown} />}

                        <ReactScrollToBottom className="chatBox">
                            {messages.map((item, i)=>{
                                return <Message message={item.message} user={item.id===id?"":item.user} classs={item.id===id?"right":"left"} time={item.time} />
                            })}
                        </ReactScrollToBottom>

                        <div className="inputBox">
                            <input onKeyPress={(e)=>{e.key==="Enter"&&send()}} type="text" id="chatInput" autoComplete="off" placeholder="Enter your message" />
                            <button onClick={send} className="sendBtn" ><img src={img} alt="send" /></button>
                        </div>
                    </div>

                    {isDesktop&&   
                        <nav className= 'sideBar'>
                            <div className="sideHeader">                        
                                <h2>Lobby</h2>
                            </div>
                            <div className="sideBox">
                                {activeUser?.map((data)=>{return <UserBox name={data} />})}     
                            </div>
                        </nav>
                    }
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Chat;