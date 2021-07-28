import React,{useState,useEffect} from 'react'
import { database } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Likes from './Likes'
import Comments from './Comments';
import AddComment from './AddComment';
import ChatIcon from '@material-ui/icons/Chat';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import style from'./MyPosts.module.css';

const useStyles = makeStyles({
})

function MyPosts({userData}) {
    const classes=useStyles();
    const [allPosts,setPosts]=useState(null);
    useEffect(()=>{
        let postArr=[];
        for(let i=userData.postIds.length-1;i>=0;i--){
            postArr.push(userData.postIds[i]);
        }
        // let postArr=[...userData.postIds];
        let newArr=[];
        let fn=async()=>{
            newArr=await Promise.all(postArr.map(async(id)=>{
                let doc=await database.posts.doc(id).get()
                let data={...doc.data(),postId:doc.id};
                // console.log(data)
                return data;
            }))
            console.log(newArr);
            setPosts(newArr);
        }
        fn();
    },[userData])
    return (
        <>
            {
                allPosts===null?<CircularProgress />:
                <div className={style.postsContainer}>
                    {  
                        allPosts.map((post,index)=>(
                            <React.Fragment key={post.postId}>
                                <div className={style.eachPost}>
                                    <video className={style.myVideo} src={post.pUrl} controls muted='muted'></video>
                                </div>
                            </React.Fragment>
                        ))
                    
                    }
                </div>
            }
        </>
    )
}

export default MyPosts
