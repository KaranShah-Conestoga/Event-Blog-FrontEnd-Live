import moment from 'moment';
import React from 'react'
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { PostServices, Post, SearchParam, } from '../../Services/PostServices';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss'
import { PostCard } from '../../Model';
import searchbackimg from '../../Assets/Images/rok0su6h.png';
import { set } from 'lodash';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [allPost, setAllPost] = useState<Post[]>([]);
  const postServices = new PostServices();
  const navigate = useNavigate();
  const [lodding, setLodding] = useState<boolean>(true);

  useEffect(() => {
    getallPost()
  }, []);

  const getallPost = async () => {
    const param: SearchParam = {
      Searchby: search
    }

    await postServices.getAllPost(param).then((data) => {
      setAllPost(data);
      setLodding(false);
    }).catch((e) => {
      console.log('e', e)
    });
  };

  const viewPost = (id) => {
    navigate(`/post/${id}`, { replace: true });
  }

  return (
    <>
      <div className='dash-container'>
        <div className="back-img">
          <img src={searchbackimg} alt="" />
        </div>
        <div className="dashboard-title">
          <h1>Explore the World of Events, Uncover Stories, and Connect with One Click </h1>
        </div>
        <div className="post-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search" placeholder="Search.."
          />
          <Button className='search-button' onClick={() => getallPost()}>
            Search
          </Button>
        </div>


      </div>
      {lodding ?
        <div className="lodding">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        : <PostCard post={allPost} />
      }


    </>

  )
}

export default Dashboard
