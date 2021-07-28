import React,{useContext} from 'react'
import { Route,Redirect } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider';
function PrivateRoute({component:Component,...rest}) {
    const {currUser} = useContext(AuthContext);
    return (
       <Route {...rest} render={props=>{
           return currUser?<Component {...props} />:<Redirect to='/login'/>
       }}/>
    )
}

export default PrivateRoute