import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import style from './Login.module.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    cred: {
        marginBottom: '1rem',
    }
}));

function Login() {
    const classes = useStyles();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const {login,currUser} = useContext(AuthContext);
    const history = useHistory();
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let res=await login(email,password);
            // let uid=res.user.uid;
            console.log(res);
            setLoading(false);
            history.push('/')
        }catch(err){
            setError(err.code);
            setTimeout(() => {
                setError('')
            }, 5000);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(currUser){
          history.push('/')
        }
    },[]);
    
    return (
        <div className={style.container}>
            <div className={style.image}>
                <img src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"></img>
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
                    <div className={style.loginForm}>
                        {error==="auth/user-not-found" && (<p className={style.errorWarning}>User with that email does not exists. Please signup.</p>)}
                        {error==="auth/invalid-email" && (<p className={style.errorWarning}>Invalid Email</p>)}
                        {error==="auth/wrong-password" && (<p className={style.errorWarning}>Wrong email or password</p>)}
                        <TextField className={classes.cred} size="small" fullWidth label="Email address" variant="outlined" type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <TextField className={classes.cred} size="small" fullWidth label="Password" variant="outlined" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Button className={classes.loginBtn} variant="contained" fullWidth color="primary" disabled={email===''||password===''||loading?true:false} onClick={handleLogin}>Login</Button>
                    </div>
                </div>
                <p className={style.signup}>Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
