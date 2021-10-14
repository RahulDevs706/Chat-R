import React from 'react'
import { Link } from 'react-router-dom'
import UserBox from './UserBox'
import { IconButton } from '@mui/material'
import {AiOutlineClose as Close} from 'react-icons/ai'
import './MoreTab.css'

const MoreTab = ({array, sideBar, setSideBar}) => {
    return (
        <nav className= {sideBar? 'navMenu active': 'navMenu'}>
            <div className='naveMenuItems'>
                <div className='navBarToggle' onClick={()=>{setSideBar(!sideBar)}}>
                    <h2>Lobby</h2>
                    <Link to='#' className='menuBars'>
                       <IconButton> <h2><Close /></h2></IconButton>
                    </Link>
                </div>
                {array?.map((data, i)=>{
                    return(
                     <div key={i} className='navText'>
                         <UserBox name={data}/>
                     </div>
                    );
                })}
            </div>
        </nav>
    )
}

export default MoreTab
