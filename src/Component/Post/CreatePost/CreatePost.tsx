import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Auth } from '../../../Core/Services/AuthService';
import { User } from '../../../Services/UserService';
import { PostServices } from '../../../Services/PostServices';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import './CreatePost.scss';

function CreatePost() {
  const editor = useRef(null);
  const [tags, setTags] = useState<any[]>([]);
  const userData: User = Auth.getUser();
  const postServices = new PostServices();
  const navigate = useNavigate();
  const postId: any = useParams().postId;
  const [oldPost, setOldPost] = useState<any>(null);
  const [checked, setChecked] = useState();
  const [post, setPost] = useState<any>({ title: '', description: '', tags: [], createdBy: userData.id, })
  useEffect(() => {
    if (postId) {
      postServices.getSinglePost(postId).then((res: any) => {
        setOldPost(res.data);
        setChecked(res.status)
        setPost({
          title: res.title,
          description: res.description,
          createdBy: userData.id,
        })
        setTags(res.tags);
      })
    }
  }, []);

  const contentFieldChanaged = (data) => {
    setPost({ ...post, 'description': data })
  }
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }
  const addTags = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const createPost = async (event) => {
    event.preventDefault();
    const param = { ...post, tags: tags }

    if (postId) {
      const newParam = { ...param, status: checked }
      await postServices.updatePost(newParam, postId).then((res: any) => {
        if (res.message) {
          alert(res.message)
        }
        navigate('/post/' + postId);
      })
    } else {
      if (param.title && param.description) {
        await postServices.createPost(param).then((res) => {
          console.log('res', res)
          navigate('/')
        }).catch((err) => {
          console.log('err', err)
        })
      }
    }
  }

  const cearPost = () => {
    setPost({ title: '', description: '', tags: [], createdBy: userData.id, })
    setTags([]);
  }

  return (
    <div className='createpost-div'>
      <div className='title'>
        {postId ? 'Update Post' : 'Create Post'}
      </div>
      <div className="status">
        {
          postId ? <>
            <FormGroup>
              <FormControlLabel control={<Switch checked={checked} onChange={switchHandler} />} label="Post Status" />
            </FormGroup>
          </> : ''
        }
      </div>
      <Form onSubmit={createPost}>
        <div className="my-3">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            placeholder="Enter here"
            className="rounded-0"
            name="title"
            onChange={fieldChanged}
            value={post.title}
          />
        </div>
        <div className="editor">
          <Form.Label>Post Description</Form.Label>
          <JoditEditor
            ref={editor}
            value={post.description}
            onChange={(newContent) => contentFieldChanaged(newContent)}
          />
        </div>
        <div className="tag-container">
          {/* {tags.map((tag) =>  <div className="tag">{tag} </div>)} */}
          {tags.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                {tag}
                <Button onClick={() => removeTags(index)}>x</Button>
              </div>
            );
          })}
          <input
            placeholder="Enter a tag"
            onKeyUp={(event) => addTags(event)}
          />
        </div>
        <div className="submit-cancel-btn">

          <div className="create-update-btn">
            {
              (postId) ? <Button name="update" onClick={createPost} className="btn btn-primary rounded-0">Update Post</Button> :
                <Button onClick={createPost} name="create" className="rounded-3" color="primary">Create Post</Button>

            }
          </div>
          <div className="cancel-btn">
            {
              (postId) ? '' :
                <Button onClick={cearPost} name="cancel" className="rounded-3 bg-danger" color="danger">Cancel</Button>

            }
          </div>

        </div>
      </Form>

      {/* <p>
        {JSON.stringify(post.description)}
      </p> */}
    </div>
  )
}

export default CreatePost
