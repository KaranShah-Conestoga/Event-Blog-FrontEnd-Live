import React from 'react';
import { NumberLiteralType } from 'typescript';
import { Http } from '../Core/Services/HttpService';
import { MyModelEntity } from "../Core/Services/MyModelService";

export type Count = {
    user: number[];
    post: number[];
    reportData: number[];
}
export type PostUserCount = {
    user: number[];
    count: number[];
}
export type ViewLikeCount = {
    user: number[];
    likeCount: number[];
    viewCount: number[];
}
export type DecadeData = {
    months: string[];
    count: number[];
}
export type SearchParam = {
    year: string;
}
export type TopUser = {
    _id: string | number;
    userId: string | number;
    count: number;
}
export type HighestMonth = {
    monthArry: number[]
}

export class HPRU extends MyModelEntity {
    _id: string | number;
    name: string;
    email: string;
    count: number;
    userId: string | number;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}

export class ReportedPostCount extends MyModelEntity {
    _id: string | number;
    postId: string | number;
    title: string;
    email: string;
    TotalReport: number;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}
export class User extends MyModelEntity {
    _id: string | number;
    fullName: string;
    email: string;
    userType: string;
    status: boolean;
    created: string;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}
export class InactiveUser extends MyModelEntity {
    // _id: string | number;
    fullName: string;
    email: string;
    status: boolean;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}

export class BlockPostReq extends MyModelEntity {
    _id: string | number;
    postId: string | number;
    name: string;
    email: string;
    type: string;
    ReqDescription: string;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}
export class BlockAccountReq extends MyModelEntity {
    _id: string | number;
    name: string;
    email: string;
    accountId: string | number;
    type: string;
    ReqDescription: string;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}
export class AdminService {

    getAllUser(params?: { Searchby: string }): Promise<User[]> {
        return new Promise((resolve, reject) => {
            Http.post('admin', params)
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


    getPostUserReportCount(params?: SearchParam): Promise<Count> {
        return new Promise((resolve, reject) => {
            Http.post('admin/userpostcount', params)
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
    getpostcount(): Promise<PostUserCount> {
        return new Promise((resolve, reject) => {
            Http.get('admin/postcount')
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
    getviewlikecount(): Promise<ViewLikeCount> {
        return new Promise((resolve, reject) => {
            Http.get('admin/user/likeviews/count')
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
    getblockpostreq(): Promise<BlockPostReq[]> {
        return new Promise((resolve, reject) => {
            Http.get('admin/post/blockpost/req')
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
    getblockAccountreq(): Promise<BlockAccountReq[]> {
        return new Promise((resolve, reject) => {
            Http.get('admin/post/blockaccount/req')
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
    getdecadeData(): Promise<DecadeData> {
        return new Promise((resolve, reject) => {
            Http.get('admin/post/tenyear/report')
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
    //getHPRU =>>  getHighestPostReportedUser
    getHPRU(): Promise<HPRU[]> {
        return new Promise((resolve, reject) => {
            Http.get('admin/highestreported/user')
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
    getInactiveUser(): Promise<InactiveUser[]> {
        return new Promise((resolve, reject) => {
            Http.get('admin/inactive/user')
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
    getTopUserInDecade(params?: HighestMonth): Promise<TopUser[]> {
        return new Promise((resolve, reject) => {

            Http.post('admin/maxpost/tenyear/user', params)
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
    deleteOpenRequest(id: string | number): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = ['admin/openpost/req', id].join('/');
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
    updatePostStatus(params: { status: boolean }, id: string | number): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = ['admin/repotedpost', id].join('/');
            Http.post(url,params)
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

    getAllReportedPost(): Promise<ReportedPostCount[]> {
        return new Promise((resolve, reject) => {
            Http.get('admin/repotedpost')
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