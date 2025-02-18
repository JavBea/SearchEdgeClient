// stores/conversations.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useConversationsStore = defineStore('conversations', {
    state: () => ({
        //会话列表
        conversations : null,
        //“加载中”标志
        loading : false,
        //错误信息
        err : null,
        //用户ID
        user_id : null,
    }),
    actions: {
        // 添加新的对话
        async addConversation() {

            this.loading = true;
            this.err = null; // 每次请求前重置错误信息
            try {
                const response = await axios.post('http://127.0.0.1:5000/createconversation', {"user_id": this.user_id});
                this.conversations.push({
                    response
                });
            } catch (error) {
                this.error = error;
                console.error(error);
            } finally {
                this.loading = false;
            }
            console.log(this.conversations);

        },

        // 从后端获取全部新的对话
        async fetchData(user_id) {
            this.loading = true;
            this.user_id = user_id;
            this.err = null; // 每次请求前重置错误信息
            try {
                const response = await axios.post('http://127.0.0.1:5000/getallconversations',{"user_id":user_id});
                this.conversations = response.data;
            } catch (error) {
                this.error = error;
                console.error(error);
            } finally {
                this.loading = false;
            }
            console.log(this.conversations);
        },

        // 删除指定的对话
        removeConversation(title) {
            this.conversations = this.conversations.filter(convo => convo.title !== title);
        },

        // 添加消息到指定对话
        addMessage(title, sender, text) {
            const conversation = this.conversations.find(convo => convo.title === title);
            if (conversation) {
                conversation.messages.push({ sender, text });
            }
        },

        // 删除指定对话中的一条消息
        removeMessage(title, messageIndex) {
            const conversation = this.conversations.find(convo => convo.title === title);
            if (conversation && conversation.messages[messageIndex]) {
                conversation.messages.splice(messageIndex, 1);
            }
        }
    },
    getters: {
        // 获取所有对话
        allConversations(state) {
            return state.conversations;
        },

        // 根据ID获取指定对话
        getConversationById: (state) => (conversation_id) => {
            return state.conversations.find(convo => convo.conversation_id === conversation_id);
        }
    }
});

