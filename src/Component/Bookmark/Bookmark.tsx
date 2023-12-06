import React, { useState, useEffect } from 'react'
import { Post } from '../../Services/PostServices'
import { UserService } from '../../Services/UserService';
import { PostCard } from '../../Model'
import './Bookmark.scss'


function Bookmark() {
    const [userBookmark, setUserBookmark] = useState<Post[]>([]);
    const userService = new UserService();

    useEffect(() => {
        getBookmark()
    }, []);
    console.log('userBookmark', userBookmark)
    const getBookmark = async () => {
        await userService.getBookmark().then((res) => {
            setUserBookmark(res)
        }).catch((e) => {
            console.log('e', e)
        });
    };

    return (
        <>
            <div className='title'>
                Bookmark
            </div>
            {/* <PostCard /> */}
            <PostCard post={userBookmark} />
        </>

    )
}

export default Bookmark
