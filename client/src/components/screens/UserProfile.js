import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setProfile] = useState(null);

    const params = useParams();
    let userid = params.id.toString();
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                setProfile(result)
            })
    }, [])
    return (
        <>
            {userProfile ? <div style={{
                maxWidth: "60rem",
                margin: "0 auto"
            }}>
                <div className='profile-top'>
                    <div className='profile-image'>
                        <img style={{ width: "14rem", height: "14rem", borderRadius: "7rem" }}
                            src="https://th.bing.com/th/id/OIP.IvY5LjHRWSSAkDmnMUZ3GAHaFj?pid=ImgDet&rs=1"
                            alt="srk" />
                    </div>
                    <div className='profile-info text-center'>
                        <h3 className='mb-3 mt-5'>{userProfile.user.name}</h3>
                        <h3 className='mb-3 mt-5'>{userProfile.user.email}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "115%" }}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>40 followers</h6>
                            <h6>40 following</h6>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='gallery'>
                    {userProfile.posts.map(item => {
                        return (
                            <img key={item._id} className='item' src={item.image} alt={item.title} />
                        )
                    })}

                </div>
            </div> : <h2 className='text-center mt-5'>Loading...</h2>}
        </>
    );
}

export default Profile;
