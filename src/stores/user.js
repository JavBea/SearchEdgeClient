// stores/user.js
import { defineStore } from 'pinia';
import axios from "axios";

export const useUserStore = defineStore('currentUser', {
    state: () => ({
        user:{
            "status": "available",
            "user_id": 10000002,
            "user_name": "user",
            "email": "user@gmail.com",
            "role": "user"
        },
        loading: false,
        err: null,
    }),
    actions: {
        setUser(user) {
            this.user=user;
        },
        setLoading(loading) {
            this.loading=loading;
        },
        setErr(err) {
            this.err=err;
        },
        async login(token,password){
            this.loading = true;
            this.err = null; // 每次请求前重置错误信息
            try {
                const response = await axios.post('http://127.0.0.1:5000/login',{"token":token, "password":password});
                this.user = response.data;
                console.log(response.data);
            } catch (err) {
                this.err = err;
                console.error(err);
            } finally {
                this.loading = false;
            }
            console.log(this.user);

            //返回登录结果
            if (this.user.code!='2001' || this.user==null) {
                return false;
            }
            else {
                return true;
            }
        },
        async register(user_name,email,password){
            this.loading = true;
            this.err = null; // 每次请求前重置错误信息
            try {
                const response = await axios.post('http://127.0.0.1:5000/register',{"user_name":user_name, "password":password, "email":email});
                this.user = response.data;
            } catch (err) {
                this.err = err;
                console.error(err);
            } finally {
                this.loading = false;
            }
            console.log(this.user);

            //返回登录结果
            if (this.user.code!='1001' || this.user==null) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    getters:{
        getCurrentUser(){
            return this.user;
        },
        getCurrentUserID(){
            return this.user_id;
        }
    }
    }
);
