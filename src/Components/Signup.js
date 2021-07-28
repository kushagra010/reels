import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from '../firebase';
import { Link } from 'react-router-dom';
import style from './Signup.module.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    cred: {
        marginBottom: '1rem',
    },
    signupBtn: {
        margin: '20px auto',
    },
    uploadBtn:{
        margin: '0',
    },
    temp:{
        border: '1px solid red',
    }
}));

function Signup() {
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] =useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(null);
    const {signup,currUser} = useContext(AuthContext);
    const history=useHistory();
    const handleSignup = async (e)=>{
        
        e.preventDefault();
        try{
            setLoading(true);
            let res = await signup(email,password);
            let uid = res.user.uid;
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');         
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
            }
            async function fn3(){
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email:email,
                    userId:uid,
                    username:name,
                    createdAt:database.getCurrentTimeStamp(),
                    profileUrl:downloadUrl,
                    postIds:[]
                })
                setLoading(false);
                console.log('User has Signed up');
                history.push('/')
            }
        }
        catch(err){
            // console.log(err);
            setError(err.code);
            setTimeout(()=>setError(''),5000);
            setLoading(false)
        }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }

    useEffect(()=>{
        if(currUser){
          history.push('/')
        }
    },[])

    return (
        <div className={style.container}>
            <div className={style.image}>
                <img src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"/>
                <div className={style.carouselContainer}>
                    <Carousel indicators={false} animation="slide" interval={4000} stopAutoPlayOnHover={false} navButtonsAlwaysInvisible={true}>
                        <img src='https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg' />
                        <img src='https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg'/>
                        <img src='https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg'/>
                        <img src='https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg'/>
                        <img src='https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg'/>
                    </Carousel>
                </div>
            </div>
            <div>
                <div className={style.formContainer}>
                    <h1 className={style.instagram}>Instagram</h1>
                    <div className={style.signupForm}>
                        <TextField className={classes.cred} id="xyz" size="small" fullWidth label="UserName" variant="outlined" type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <div className={classes.cred}> 
                            <TextField size="small" fullWidth label="Email address" variant="outlined" type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            {error==="auth/email-already-in-use" && (<p className={style.errorWarning}>Email already exists. Please login.</p>)}
                            {error==="auth/invalid-email" && (<p className={style.errorWarning}>Invalid Email</p>)}
                        </div>
                        <TextField className={classes.cred} size="small" fullWidth label="Password" variant="outlined" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Button variant="contained" fullWidth color="default" className={classes.uploadBtn} startIcon={<CloudUploadIcon />} component="label" onChange={handleFileSubmit}>
                            Profile Image<input type="file" accept='image/*' hidden/>
                        </Button>
                        <Button variant="contained" fullWidth className={classes.signupBtn} color="primary" disabled={email===''||password===''||name===''||loading?true:false} onClick={handleSignup}>Signup</Button>
                    </div>
                </div>
                <p className={style.login}>Have an account? 
                    <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
