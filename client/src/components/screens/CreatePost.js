import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CreatePost = () => {
    const Navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [pic, setPic] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            fetch('/createpost', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")

                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            progress: undefined,
                        });

                    } else {
                        toast.success("successfully created post", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            progress: undefined,
                        });
                        Navigate('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }, [url])

    const postData = () => {
        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', 'insta_clone');
        data.append('cloud_name', 'dyuwui1999');
        fetch('https://api.cloudinary.com/v1_1/dyuwui1999/image/upload', {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err));
    }


    return (
        <div className='card' style={{
            width: "30rem",
            margin: "4rem auto"
        }}>
            <h4 className='text-center m-5' style={{ fontFamily: "Lobster" }}> CREATE POST</h4>
            <input type="text" placeholder='Title' className='m-3'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input type="text" placeholder='Body' className='m-3'
                value={body}
                onChange={e => setBody(e.target.value)}
            />
            <input type="file" className='m-3'
                onChange={e => setPic(e.target.files[0])}
            />
            <button className='btn btn-info m-3' onClick={postData}>Submit Post</button>
            <ToastContainer />
        </div>
    );
}

export default CreatePost;
