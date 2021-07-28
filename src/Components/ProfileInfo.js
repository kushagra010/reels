import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './ProfileInfo.css'

function ProfileInfo({userData}) {
    return (
        <div className="profileInfoContainer">
            <div className="left-part">
                <Avatar alt={userData.username} src={userData.profileUrl} className='avatar'/>
                <h2 className="userName">{userData.username}</h2>
            </div>
            <h1 className="right-part">
                {userData.postIds.length} Posts
            </h1>  
        </div>
    )
}

export default ProfileInfo
