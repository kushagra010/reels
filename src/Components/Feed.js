import React,{useState,useEffect,useContext} from 'react';
import './Feed.css';
import Header from './Header';
import Posts from './Posts';
import {AuthContext} from '../Context/AuthProvider';
import { database } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function Feed() {
    const {currUser,logout}=useContext(AuthContext);
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        const unsub=database.users.doc(currUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
        return()=>{
            unsub();
        }
    },[currUser]);
    return (
        <>
            {userData===null?<CircularProgress />:
                <div>
                    <Header className='header' logout={logout} userData={userData}></Header>
                    <div className='feedContainer'>
                        <div className='center'>
                            {/* <UploadFile userData={userData} style={{margin: 'auto'}}></UploadFile> */}
                            <Posts userData={userData}></Posts>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Feed
