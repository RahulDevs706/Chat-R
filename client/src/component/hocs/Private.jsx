import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { user } from '../Join/Join';

const Private = ({component: Component, ...rest})=> {

    return (
        <Route {...rest} render={props=>{
            if(!user){
                return <Redirect to={{pathname:'/' }} />
                } 

            return <Component {...props} />
        }} />
    )
}

export default Private
