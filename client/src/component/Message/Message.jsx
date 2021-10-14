// Message box component
import React from 'react'
import './Message.css'

const Message = ({user, message, classs, time}) => {

    if(message!==null){

        if(user==="Admin"){
        
                return (
                <div className="msgBox admin">
                    {`${message}`}
                </div>)
        }
        else if(user){
            return (
                <div className={`msgBox ${classs}`}>
                    {`${user&&user}: ${message}`}
                    <p>{time}</p>
                </div>
            )
        }
        else{
            return(
                <div className={`msgBox ${classs}`}>
                    {`You: ${message}`}
                    <p>{time}</p>
                </div>
            )
        }
    }else{return null}
}



    

export default Message
