import { User } from "../../Services/UserService";

const AuthService = (function () {

    let _STORAGE_KEY = (
        (process.env.REACT_APP_AUTH_STORAGE_KEY)
            ? process.env.REACT_APP_AUTH_STORAGE_KEY
            : 'AUTH.USER'
    );

    let _STORAGE_TYPE = process.env.REACT_APP_AUTH_STORAGE_TYPE;

    let _DURATION: number = Number(process.env.REACT_APP_AUTH_DURATION) || 30;

    // const Storage = (): any => {
    //   return (_STORAGE_TYPE === 'cookie') ? new CookieService() : new StorageService(_STORAGE_TYPE);
    // }

    const diff = (endTime: number, startTime?: Date) => {
        const sTime = (startTime) ? startTime.getTime() : (new Date().getTime());
        return endTime - sTime;
    }

    class AuthService {

        constructor(type = null, duration = null) {
            _STORAGE_TYPE = _STORAGE_TYPE;
            _DURATION = (duration !== null) ? duration : _DURATION;
        }

        get() {
            // return Storage().get(_STORAGE_KEY);
            const userData: any = localStorage.getItem(_STORAGE_KEY);
            return JSON.parse(userData);
        }

        getUser(): User {
            const auth = this.get();
            if (auth && auth != null) {
                if (diff(auth.expires) > 0) {
                    return new User(auth.user[0]);
                } else {
                    // Storage().delete(_STORAGE_KEY);
                    localStorage.removeItem(_STORAGE_KEY);
                    return new User();
                }
                // localStorage.removeItem(_STORAGE_KEY);
                // return new User();
            } else {
                localStorage.removeItem(_STORAGE_KEY);
                return new User();
            }
        }

        isAuthorized(): boolean {
            return (this.getUser()._id) ? true : false;
        }

        setUser(data: any): Promise<User | boolean> {
            return new Promise((resolve, reject) => {
                const expires: number = new Date(new Date().getTime() + (_DURATION * 60000)).getTime();
                const auth: any = {
                    user: data,
                    expires: expires
                };
                const userData = localStorage.setItem(_STORAGE_KEY, JSON.stringify(auth));
                // Storage().set(_STORAGE_KEY, auth);
                // localStorage.setItem(_STORAGE_KEY, auth);
                const user = this.getUser();
                if (user._id) {
                    resolve(user);
                } else {
                    reject(false);
                }
            });
        }

        logout(): Promise<boolean> {
            return new Promise((resolve) => {
                // const logout = Storage().delete(_STORAGE_KEY);
                const logout: any = localStorage.removeItem(_STORAGE_KEY);
                resolve(logout);
            });
        }

    }

    return AuthService;
})();

export const Auth = new AuthService();

export default AuthService;
