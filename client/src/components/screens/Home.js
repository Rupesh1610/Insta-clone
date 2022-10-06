import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../App'
import { Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const { state } = useContext(UserContext);

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
            .catch(err => console.log(err))
    }, [])

    const Like = (id) => {
        fetch('/like', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(likeddata => likeddata.json())
            .then(res => {
                const newData = data.map(items => {
                    if (items._id === res._id) {
                        console.log(res);
                        return res;
                    } else {
                        return items;
                    }
                })
                setData(newData)
            })
            .catch(err => console.log(err))
    }
    const UnLike = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(unlikeddata => unlikeddata.json())
            .then(res => {
                const newData = data.map(items => {
                    if (items._id === res._id) {
                        return res;
                    } else {
                        return items;
                    }
                })
                setData(newData)
            })
            .catch(err => console.log(err))
    }
    const comment = (text, id) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id,
                text: text
            })
        }).then(newComment => newComment.json())
            .then(res => {
                const newData = data.map(items => {
                    if (items._id === res._id) {
                        return res;
                    } else {
                        return items;
                    }
                })
                setData(newData)
            })
            .catch(err => console.log(err))
    }
    const deletePost = (id) => {
        fetch('/mypost', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(updatedPosts => updatedPosts.json())
            .then(res => {
                const newData = data.filter(items => {
                    return items._id !== res._id
                })
                setData(newData)
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            {data.map(items => {
                return (
                    <div key={items._id} style={{
                        width: "70%",
                        border: "1px solid gray",
                        margin: "5rem auto"
                    }}>
                        <div className='home-card'>
                            <Stack direction='row' m={3} justifyContent='space-between'>
                                <Stack direction='row' spacing={1}>
                                    <Avatar alt={items.name} src='https://pbs.twimg.com/profile_images/901298250/s_202_400x400.jpg' />
                                    <h3><NavLink to={`/profile/${items.postedBy._id}`} className='profile-link'>{items.postedBy.name}</NavLink></h3>
                                </Stack>
                                {
                                    (items.postedBy._id === state._id ? <DeleteIcon fontSize='large' onClick={() => deletePost(items._id)} /> : null)
                                }
                            </Stack>
                            <div>
                                <img style={{
                                    width: "100%"
                                }} src={items.image} alt="img" />
                            </div>
                            <div className='card-content'>
                                {items.likes.includes(state._id)
                                    ? <i className="fa-solid fa-thumbs-down fa-2xl m-3" onClick={() => {
                                        UnLike(items._id)
                                    }}></i>
                                    : <i className="fa-sharp fa-solid fa-thumbs-up fa-2xl m-3" onClick={() => {
                                        Like(items._id)
                                    }}></i>
                                }
                                <h6 className='m-3'>{items.likes.length} Likes</h6>
                                <h5 className='m-3'>{items.title}</h5>
                                <p className='m-3'>{items.body}</p>
                                {items.comments.map(item => {
                                    return (
                                        <p key={item._id} className='m-3'><span style={{ fontWeight: 'bold' }}>{item.postedBy.name} </span> {item.text}</p>
                                    )
                                })}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    comment(e.target[0].value, items._id);
                                }}>
                                    <input className='comment' type="text" placeholder='Comment....' style={{ width: "80%", border: "none" }} />
                                </form>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default Home;
