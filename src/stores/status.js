// stores/status.js
import { defineStore } from 'pinia';

export const useStatusStore = defineStore('status', {
    state: () => ({
        //登录状态
        isLoggedIn: false,
        //左侧菜单是否展开
        isCollapsed: false,
        //当前用户信息
        user: null,

    }),
    actions: {
        // 添加新的对话
        addConversation(title) {
            this.conversations.push({
                title,
                messages: [] // 新对话的消息是空的
            });
        },
        // 展开/关闭左侧菜单
        collapse(){
            this.isCollapsed =!this.isCollapsed;
        }

    },
    getters: {

    }
});

