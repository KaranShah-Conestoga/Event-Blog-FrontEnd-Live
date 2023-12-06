import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Post } from "./../../Services/PostServices";
import { User, UserService } from "../../Services/UserService";
import PostCard from "./../../Model/PostCard/PostCard";
import axios from "axios";
import { Button } from "react-bootstrap";
import { ReportPopup } from "../../Model";
import { Auth } from "../../Core/Services/AuthService";

function Profile() {
  const userId: any = useParams().userId;
  const userService = new UserService();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<User>();
  const [show, setShow] = useState(false);
  const handleShowPopup = () => setShow(true);
  const userData: User = Auth.getUser();

  useEffect(() => {
    const getProfile = async () => {
      const response = await userService.getUserPosts(userId);
      setUserPosts(response);
    };
    const getUserProfile = async () => {
      const response = await userService.getUserProfile(userId);
      setProfile(response);
    };

    getUserProfile();
    getProfile();
  }, [userId]);

  return (
    <>
      <ReportPopup view={show} type="Account" Id={userId} handleShowPopup={setShow} />
      <div className="title">
        <div className="user">
          {/* <div className="user__name">Karan Shah</div> */}
          <div className="user__name">{profile?.FullName}</div>
          {/* <div className="user__name">{profile?.Email}</div> */}
          <div>
            {(userData.id !== userId) ?
              <Button variant="primary" onClick={handleShowPopup}>Report</Button>
              : ''}
          </div>
        </div>
      </div>



      {/* <PostCard /> */}
      <PostCard post={userPosts} />
    </>
  );
}

export default Profile;
