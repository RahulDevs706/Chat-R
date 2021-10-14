import React, {createContext, useState} from 'react'

export const MessageContext = createContext();

export default ({children})=>{
    const [messages, setMsgs] = useState([]);
    


    return(
        <div>
            <MessageContext.Provider value={{messages,setMsgs}}>{children}</MessageContext.Provider>
        </div>
    );

}

