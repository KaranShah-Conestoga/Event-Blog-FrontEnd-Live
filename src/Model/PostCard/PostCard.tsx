import React from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../../Services/PostServices';
import './PostCard.scss'

type PostProps = {
  post: Post[]
};

function PostCard(props: PostProps) {
  const navigate = useNavigate();
  const newpost = props.post;

  const viewPost = (id) => {
    navigate(`/post/${id}`, { replace: true });
  }

  return (
    <div className="container">
      {newpost.map((item, index) => {
        const tag: any = item.tags;
        return (

          <div className="card" key={Math.random()} onClick={() => viewPost(item._id)} >
            <div className="card__header">
              {/* <img src="https://source.unsplash.com/600x400/?event" alt="card__image" className="card__image" width="600" /> */}
              {/* random image for every post */}
              <img src={`https://source.unsplash.com/600x400/?${item.title}`} alt="card__image" className="card__image" width="600" />
              { item.name ? 
                <div className="card__footer">
                <div className="user">
                  <div className="user__info">
                    <h5>{item.name}</h5>
                    {/* <small>{item.created}</small> */}
                  </div>
                </div>
              </div>
              : ''}
            
            </div>

            {(item.blocked == true) ? <div className="blocked">Blocked</div> : ''}
            <div className="card__body">
              <div className="tag-div">
                {
                  tag.map((item, i) => {
                    return (
                      <>
                        <span className="tag tag-blue" key={i.toString()}> {item} </span>
                      </>
                    )
                  })
                }
              </div>
              <h4>{item.title}</h4>
              {/* <p className='discription'>{item.description}</p> */}
              <p className='discription' dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
            <div className="like-dislikes">
              <div className="like">
                <div className="icon">
                  <AiOutlineLike />
                </div>
                <div className="div">
                  {item.likes}
                </div>
              </div>
              <div className="dislike">
                <AiOutlineDislike />
                {item.dislikes}
              </div>
              <div className="views">
                <div className="icon">
                  views
                </div>
                <div className="div">
                  {item.count}
                </div>
              </div>
            </div>

          </div>
        )
      })}

    </div>

  )
}

export default PostCard
