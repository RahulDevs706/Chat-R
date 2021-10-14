import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import './Join.css'

let user;

const sendUser = ()=>{
    user= document.getElementById("joinInput").value;
    document.getElementById('joinInput').value='';
}

const Join = () => {
    const [name, setName] = useState("")
    
    return (
        <div className="joinPage">
            <div className="joinContainer">
                <img src={logo} alt="logo" />
                <h1>Chat-R</h1>
                <form>
                <input onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" type="text" id="joinInput" autoComplete="off" />
               <Link onClick={(e)=>{!name&&e.preventDefault()}} to="/chat"> <button onClick={sendUser} className="joinBtn">Login</button> </Link>
               </form>
            </div>
            <div className="footer">
                <p>&copy; Rahul Singh</p>
                <p>Note: All the rights of images and icons are reserved to their respective owners</p>
            </div>
            
        </div>
    )
}

export default Join;
export {user};
