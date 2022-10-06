import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
    const [pics, setPics] = useState([]);
    const { state } = useContext(UserContext);
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => setPics(result.mypost))
    }, [])
    return (
        <div style={{
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
                    <h3 className='mb-3 mt-5'>{state ? state.name : 'loading'}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "115%" }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
            <hr />
            <div className='gallery'>
                {pics.map(item => {
                    return (
                        <img key={item._id} className='item' src={item.image} alt={item.title} />
                    )
                })}

            </div>
        </div>
    );
}

export default Profile;
