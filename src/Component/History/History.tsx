import React, { useState, useEffect } from 'react'
import { Post } from '../../Services/PostServices'
import { UserService } from '../../Services/UserService';
import { PostCard } from '../../Model'
import './History.scss'

function History() {
  const [userHistory, setUserHistory] = useState<Post[]>([]);
  const userService = new UserService();

  useEffect(() => {
    getHistory()
  }, []);

  const getHistory = async () => {
    await userService.getUserHistory().then((res) => {
      setUserHistory(res)
    }).catch((e) => {
      console.log('e', e)
    });
  };

  return (
    <>
      <div className='title'>
        History
      </div>
      <PostCard post={userHistory} />
    </>


  )
}

export default History
