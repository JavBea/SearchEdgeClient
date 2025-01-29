// stores/currentUser.js
import { defineStore } from 'pinia';

export const useCurrentUserStore = defineStore('currentUser', {
        state: () => ({
            user_name: null,
            user_id: null,
            email: null,
            role: null,
            status: null,
            user:{
                "code": "2001",
                "status": "available",
                "user_id": 10000002,
                "user_name": "user",
                "email": "user@gmail.com",
                "role": "user"
            },
        }),
        actions: {
            setUser(user) {
                this.index = user.user_name;
                this.user_id = user.user_id;
                this.email = user.email;
                this.role = user.role;
                this.status = user.status;
                this.user = user;
            },
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
