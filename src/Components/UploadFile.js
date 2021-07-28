import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import {storage,database} from '../firebase'

const useStyles = makeStyles((theme) => ({

}));

function UploadFile({userData}) {
    const classes = useStyles();
    let [error,setError]=useState(null);
    let [loading,setLoading]=useState(false);
    const types =['video/mp4','video/webm','video/ogg'];

    const handleChange=async(e)=>{
        setLoading(true);
        const file = e?.target?.files[0];
        if(!file){
            setError('Please select a file');
            setTimeout(()=>{setError(null)},2000);
            setLoading(false);
            return;
        }

        if(types.indexOf(file.type)==-1)
        {
            setError('Please select a video file');
            setTimeout(()=>{setError(null)},2000);
            setLoading(false);
            return;
        }

        if(file.size/(1024*1024)>100)
        {
            setError('The selected file is too big');
            setTimeout(()=>{setError(null)},2000);
            setLoading(false);
            return;
        }
        const uploadTaskListener = storage.ref(`/posts/${userData.userId}/${file.name}`).put(file);
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');         
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError(null)
                },2000);
                setLoading(false)
            }
            async function fn3(){
                uploadTaskListener.snapshot.ref.getDownloadURL().then((url)=>{
                    let obj={
                        comments:[],
                        likes:[],
                        pId: uuidv4(),
                        pUrl: url,
                        uName: userData?.username,
                        uProfile: userData?.profileUrl,
                        userId: userData?.userId,
                        createdAt:database.getCurrentTimeStamp()
                    }

                    database.posts.add(obj).then(async (docRef)=>{
                        let res = await database.users.doc(userData.userId).update({
                            postIds:[...userData.postIds,docRef.id]
                        })
                    }).then(()=>{
                        setLoading(false)
                    }).catch(e=>{
                        setError(e);
                        setTimeout(()=>{
                            setError(null)
                        },2000);
                        setLoading(false)
                    })
                });
            }
    }
    return (
        <div>
            {error!=null? <Alert severity="error">{error}</Alert>:
                <>
                    <Button variant="contained" disabled={loading} color="secondary" startIcon={<MovieIcon/>} component="label">
                        Upload<input type="file" onChange={handleChange} hidden/>
                    </Button>
                    {loading?<LinearProgress color='secondary' style={{marginTop:'2%',width: '100%'}}/>:<></>}
                </>
            }
        </div>
    )
}

export default UploadFile
