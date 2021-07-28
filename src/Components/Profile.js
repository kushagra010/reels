import React,{useState,useEffect,useContext} from 'react';
import {database} from '../firebase';
import {AuthContext} from '../Context/AuthProvider';
import ProfileInfo from './ProfileInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import './Profile.css';
import MyPosts from './MyPosts';

const useStyles = makeStyles((theme) => ({
    middle: {
        [theme.breakpoints.up('md')]: {
            width: '70%',
        },
        width: '100%',
    }
}));

function Profile() {
    const classes=useStyles();
    // const [posts,setPosts]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const {currUser,logout}=useContext(AuthContext);
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        const unsub=database.users.doc(currUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
        return()=>{
            unsub();
        }
    },[]);

    return (
        <>
            {
                userData===null?<CircularProgress />:
                <div>
                    <Header className='header' logout={logout} userData={userData}></Header>
                    <div className='profileContainer'>
                        <div className={`${classes.middle} 'profileCenter'`} >
                            <ProfileInfo userData={userData}></ProfileInfo>
                            {
                                userData.postIds.length===0?<div className="noPosts"><h1>No posts Yet</h1></div>:
                                <MyPosts userData={userData}></MyPosts>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
