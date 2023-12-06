import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { User } from "../../../Services/UserService";
import { PostServices, Post, Comments } from "../../../Services/PostServices";
import moment from "moment";
import { BsBookmarkPlus, BsBookmarkPlusFill, BsThreeDotsVertical, } from "react-icons/bs";
import { Auth } from "../../../Core/Services/AuthService";
import { ToastContainer, Toast, Spinner } from "react-bootstrap";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "react-bootstrap/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { ReportPopup } from "../../../Model";
import "./ViewPost.scss";
import { AdminService } from "../../../Services/AdminServices";
import * as io from "socket.io-client";


const socket = io.connect(`${process.env.REACT_APP_API_ENDPOINT}`);

function ViewPost() {
  const [post, setPost] = useState<Post>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLiked, setIsLiked] = useState(0);
  const [isDisLiked, setDisLiked] = useState(0);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [textboxId, setTextboxId] = useState<string | number>("");
  const [highlightedComment, setHighlightedComment] = useState<string | number>("");
  const [seeMore, setSeeMore] = useState<string | number>("");
  const [unlock, setUnlock] = useState(false);
  const [checked, setChecked] = useState<boolean>();
  const postId: any = useParams().postId;
  const reqId: any = useParams().reqId;
  const postServices = new PostServices();
  const adminServices = new AdminService();
  const userData: User = Auth.getUser();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleShowPopup = () => setShow(true);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showPopup = () => {
    setShow(true);
    setUnlock(true);
  };
  const joinRoom = () => {
    if (postId != '') {
      socket.emit("postId_connect", postId);
    }
    return true
  };
  useEffect(() => {
    if (postId) {
      joinRoom()
      postServices.getSinglePost(postId).then((res: Post) => {
        setPost(res);
        setChecked(res.status)
        setIsBookmarked(res.isBookmarked);
        if (res.isLiked == 1) {
          setIsLiked(1);
        } else if (res.isLiked == -1) {
          setDisLiked(-1);
        }
      });
      allPostComments();
    }
  }, []);

  useEffect(() => {
    socket.on("receive_comment", (data) => {
      // setMessageReceived(data.message);
      allPostComments();
      console.log('messageReceived')
    });
  }, [socket]);

  const allPostComments = () => {
    postServices.getComments(postId).then((res: any) => {
      setComments(res);
    });
  };

  const bookmark = async (postId, status) => {
    setIsBookmarked(status);

    const param = {
      userId: userData.id,
      postId: postId,
      isBookmark: status,
    };
    await postServices
      .bookmark(param)
      .then((res) => {
        setShowMessage(res.message);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const likepost = async (postId, status) => {
    if (status == 1) {
      setIsLiked(1);
      setDisLiked(0);
    } else if (status == -1) {
      setIsLiked(0);
      setDisLiked(-1);
    } else {
      setIsLiked(0);
      setDisLiked(0);
    }

    const param = {
      likedBy: userData.id,
      postId: postId,
      status: status,
    };
    await postServices
      .LikePost(param, postId)
      .then((res) => {
        console.log("Done");
      })
      .catch((e) => {
        console.log("e", e);
      });
  };


  const deltePost = async (postId) => {
    await postServices
      .deletePost(postId)
      .then((res) => {
        navigate(`/`, { replace: true });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const handleMessageChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = (
    parentCommentId?: string | number,
    parentId?: string | number
  ) => {
    if (comment) {
      const payload: any = {
        postId:postId,
        userId: userData.id,
        parentId: parentId ? parentId : postId,
        comment: comment,
      };
      if (parentCommentId) {
        payload.parentCommentId = parentCommentId;
      }
      console.log('payload', payload)
      socket.emit("send_comment", payload);
      postServices
        .createComments(payload)
        .then((res) => {
          console.log("succeful", res);
          setComment("");
          allPostComments();
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  };

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    const param:any = {
      status : !checked
    }

    adminServices.updatePostStatus(param,postId).then((res) => {
      console.log('res', res)
    } 
    )
  };
  const deleteReq = async () => {
    await adminServices.deleteOpenRequest(reqId).then((res) => {
      navigate("/reports", { replace: true });
    })
  };

  return (
    <div className="post-view">
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => setShowMessage(null)}
          bg="success"
          show={!!showMessage}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Successful</strong>
          </Toast.Header>
          <Toast.Body>{showMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => setShowError(null)}
          bg="danger"
          show={!!showError}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{showError}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="post-view__title">
        {/* <div className="status">
          <FormGroup>
            <FormControlLabel control={<Switch checked={checked} onChange={switchHandler} />} label="Post Status" />
          </FormGroup>
        </div> */}
        <div className="title">
          <h1>{post?.title}</h1>
        </div>
        <div className="menu">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Post Setting">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "Post Setting" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <BsThreeDotsVertical className="text-dark" />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem> */}
              {/* <Divider /> */}
              {userData.id != post?.createdBy ? (
                <MenuItem onClick={handleShowPopup}>Report</MenuItem>
              ) : (
                <div className="drop-down-menu">
                  <MenuItem>
                    <Link to={`/updatepost/${post._id}`}>Update</Link>
                  </MenuItem>

                  <MenuItem onClick={() => deltePost(post._id)}>
                    Delete
                  </MenuItem>
                  {post.blocked ?
                    <MenuItem onClick={showPopup}>
                      Open Report Request
                    </MenuItem>
                    : ""}
                </div>
              )}
            </Menu>
          </React.Fragment>
        </div>
      </div>

      {/* Report PopUp */}
      <ReportPopup view={show} type="Post" Id={postId} unlock={unlock} handleShowPopup={setShow} />

      <div className="post-owner">
        <div className="name-date">
          <div
            className="owner-name"
            onClick={() =>
              navigate(`/user/${post?.createdBy}`, { replace: true })
            }
          >
            {post?.name}
          </div>
          <div className="created-date">
            {moment(post?.created).format("DD/MM/YYYY")}
          </div>
        </div>

        <div className="like-bookmark">
          {(userData.UserType === "Admin") ?
            <>
              <FormGroup>
                <FormControlLabel control={<Switch checked={checked} onChange={switchHandler} />} label="Post Status" />
              </FormGroup>
              <Button variant='danger' onClick={deleteReq}>Delete </Button>
            </>
            :
            <>
              <div className="like-dislike">
                <div className="like">
                  {isLiked == 1 ? (
                    <AiFillLike onClick={() => likepost(post?._id, 0)} />
                  ) : (
                    <AiOutlineLike onClick={() => likepost(post?._id, 1)} />
                  )}
                </div>
                <div className="dislike">
                  {isDisLiked == -1 ? (
                    <AiFillDislike onClick={() => likepost(post?._id, 0)} />
                  ) : (
                    <AiOutlineDislike onClick={() => likepost(post?._id, -1)} />
                  )}
                </div>
              </div>

              <div className="bookmark">
                {isBookmarked ? (
                  <BsBookmarkPlusFill onClick={() => bookmark(post?._id, false)} />
                ) : (
                  <BsBookmarkPlus onClick={() => bookmark(post?._id, true)} />
                )}
              </div>
            </>
          }

        </div>
      </div>
      <div className="post-image">
        {/* <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="100%" /> */}
        <img
          src="https://images.pexels.com/photos/2565919/pexels-photo-2565919.jpeg?cs=srgb&dl=pexels-sanni-sahil-2565919.jpg&fm=jpg"
          alt="card__image"
          className="card__image"
          width="100%"
        />
      </div>
      <div className="description">
        {/* {JSON.parse(post?.description)} */}

        <div dangerouslySetInnerHTML={{ __html: post?.description }} />
      </div>
      <Divider />
      <div className="comment">
        <h1 className="title">Comments:</h1>
        <div className="all-commnets">
          {comments.map((item) => {
            return (
              <>
                <div
                  className="user-comment"
                  style={{
                    backgroundColor:
                      highlightedComment == item._id ? "#d3d3d3" : "",
                  }}
                >
                  <div className="user-name">
                    <div className="name">{item?.name}</div>
                    <div
                      className="comment-btn"
                      onClick={() => setTextboxId(item._id)}
                    >
                      <ReplyIcon />
                      <h6>Reply</h6>
                    </div>
                  </div>
                  <div className="comment-text">{item?.comment}</div>
                  {textboxId == item?._id ? (
                    <>
                      <br />
                      <div className="comment-box">
                        <div className="comment-input">
                          <textarea
                            value={comment}
                            placeholder="Enter Comment..."
                            className="input-box"
                            onChange={handleMessageChange}
                          ></textarea>
                        </div>
                        <div className="comment-btn">
                          <Button
                            onClick={() =>
                              submitComment(item.parentCommentId, item.parentId)
                            }
                          >
                            Post
                          </Button>
                          <button
                            className="cross"
                            onClick={() => setTextboxId("")}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {item.subComments.length > 0 && seeMore == item._id
                  ? item.subComments.map((subItem) => {
                    return (
                      <div
                        className="sub-user-comment"
                        style={{
                          backgroundColor:
                            highlightedComment == subItem._id
                              ? "#d3d3d3"
                              : "",
                        }}
                      >
                        <div className="user-name">
                          <div className="name">
                            <a
                              className="parent"
                              onClick={() =>
                                setHighlightedComment(subItem.parentCommentId)
                              }
                            >
                              {" "}
                              @ {subItem.parent}{" "}
                            </a>
                            {subItem?.name}
                          </div>
                          <div
                            className="comment-btn"
                            onClick={() => setTextboxId(subItem?._id)}
                          >
                            <ReplyIcon />
                            <h6>Reply</h6>
                          </div>
                        </div>
                        <div className="comment-text">{subItem?.comment}</div>
                        {textboxId == subItem?._id ? (
                          <>
                            <br />
                            <div className="comment-box">
                              <div className="comment-input">
                                <textarea
                                  value={comment}
                                  placeholder="Enter Comment..."
                                  className="input-box"
                                  onChange={handleMessageChange}
                                ></textarea>
                              </div>
                              <div className="comment-btn">
                                <Button
                                  onClick={() =>
                                    submitComment(
                                      subItem._id,
                                      subItem.parentId
                                    )
                                  }
                                >
                                  Post
                                </Button>
                                <button
                                  className="cross"
                                  onClick={() => setTextboxId("")}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    );
                  })
                  : ""}
                {item.subComments.length > 0 ? (
                  seeMore == item._id ? (
                    <div className="see-more">
                      <p onClick={() => setSeeMore("")}>See Less</p>
                    </div>
                  ) : (
                    <div className="see-more">
                      <p onClick={() => setSeeMore(item._id)}>See More</p>
                    </div>
                  )
                ) : (
                  ""
                )}

                {/* <p onClick={() => setSeeMore(item._id)}>
                                    {(seeMore == item._id) ? 'See Less' : 'See More'}
                                </p> */}
              </>
            );
          })}
        </div>

        <div className="comment-box">
          <div className="comment-input">
            <textarea
              className="input-box"
              value={comment}
              placeholder="Enter Comment..."
              onChange={handleMessageChange}
            ></textarea>
          </div>
          <div className="comment-btn">
            <Button onClick={() => submitComment()}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
