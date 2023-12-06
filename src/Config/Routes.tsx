import { lazy } from "react";
import type { RouteProps } from "../Core/Components/Routes";
import {

  AboutUs,
  Bookmark,
  CreatePost,
  Dashboard,
  History,
  NotFound,
  Profile
} from "../Component";
import { AdminDashBoard, AdminRequest, AdminUserList } from "../Admin";
import ViewPost from "../Component/Post/ViewPost";
import Request from "../Admin/Request";
import Report from "../Admin/Report";



const comman: RouteProps[] = [
  {
    path: "/404",
    element: NotFound,
  },
];

const admin: RouteProps[] = [
  {
    path: "/",
    to: "dashboard",
    private: true,
  },
  {
    path: "/dashboard/*",
    element: AdminDashBoard,
    private: true
  },
  {
    path: "/request/*",
    element: AdminRequest,
    private: true
  },
  {
    path: "/allusers/*",
    element: AdminUserList,
    private: true
  },
  {
    path: "req/:reqId/post/:postId",
    element: ViewPost,
    private: true,
  },
  {
    path: "/user/:userId",
    element: Profile,
    private: true,
  },
  {
    path:"/request/*",
    element: Request,
    private: true,
  },{
    path:"/Reports/*",
    element: Report,
    private: true,
  }
]

const app: RouteProps[] = [
  {
    path: "/",
    to: "dashboard",
    private: true,
  },
  {
    path: "/login",
    element: lazy(() => import("../Component/Login/Login")),
    isAuthTo: "/",
  },
  {
    path: "/signup",
    element: lazy(() => import("../Component/SignUp/SignUp")),
    isAuthTo: "/",
  },

  //module routs

  {
    path: "/dashboard/*",
    element: Dashboard,
    private: true,
  },
  {
    path: "/bookmark",
    element: Bookmark,
    private: true,
  },
  {
    path: "/newpost/",
    element: CreatePost,
    private: true,
  },
  {
    path: "/updatepost/:postId",
    element: CreatePost,
    private: true,
  },
  {
    path: "/post/:postId",
    element: ViewPost,
    private: true,
  },
  {
    path: "/aboutUs/",
    element: AboutUs,
    private: true,
  },
  {
    path: "/user/:userId",
    element: Profile,
    private: true,
  },
  {
    path: "/history",
    element: History,
    private: true,
  },
];

const routes = { app, comman, admin };

export default routes;
