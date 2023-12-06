
import React from 'react';
import { Http } from '../Core/Services/HttpService';
import { Post } from './PostServices';
import { MyModelEntity } from "../Core/Services/MyModelService";

export type LoginParam = {
    email: string;
    password: string;
}
export type SignUpParam = {
    email: string;
    password: string;
    fullName:string;
}


export class Notification  extends MyModelEntity  {
    _id: string | number;
    owner: string | number;
    postId: string | number;
    description: string;
    created: string;
    title:string;

    constructor(data ?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}


export class User extends MyModelEntity {

    _id: string;
    Email: string;
    FullName: string;
    Token?: string;
    UserType?: string;

    

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}

export class UserService {

    login(params: LoginParam): Promise<User> {
        console.log('params', params)
        return new Promise((resolve, reject) => {
            Http.post('/user/sign_in', params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    signUp(params: SignUpParam): Promise<any> {
        console.log('params', params)
        return new Promise((resolve, reject) => {
            Http.post('/user/register', params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }

    getUserHistory(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            Http.get('user/history')
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    getBookmark(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            Http.get('post/bookmark')
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    getUserPosts(id: string | number): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            const url = ['post/getallposts', id].join('/');
            Http.get(url)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    getUserProfile(id: string | number): Promise<User> {
        return new Promise((resolve, reject) => {
            const url = ['user/profile', id].join('/');
            Http.get(url)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    getUserNotification(id: string | number): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            const url = ['user/notification', id].join('/');
            Http.get(url)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    deleteNotification(id: string | number): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            const url = ['user/notification', id].join('/');
            Http.delete(url)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }

}
