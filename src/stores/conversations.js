// stores/conversations.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useConversationsStore = defineStore('conversations', {
    state: () => ({
        conversations : null,
        // conversations: [
        //     {
        //         title: '对话 10', // 对话标题
        //         messages: [
        //             { sender: 'user', text: '你好' }, // 用户的消息
        //             { sender: 'system', text: '您好！有什么问题可以帮您解答？' } // 系统的回复
        //         ],
        //         conversation_id:10001,
        //     },
        //     {
        //         title: '对话 2',
        //         messages: [
        //             { sender: 'user', text: '今天的天气怎么样？' },
        //             { sender: 'system', text: '今天是晴天，温度适宜。' }
        //         ],
        //         conversation_id:10002,
        //     },
        //     {
        //         title: '对话 3',
        //         messages: [
        //             { sender: 'user', text: '你能做什么？' },
        //             { sender: 'system', text: '我可以帮助你回答问题、做任务等。' }
        //         ],
        //         conversation_id:10003,
        //     },
        //     {
        //         title: '对话 4',
        //         messages: [
        //             { sender: 'user', text: '你能做什么？' },
        //             { sender: 'system', text: '我可以帮助你回答问题、做任务等。' }
        //         ],
        //         conversation_id:10004,
        //     },
        //     {
        //         title: '对话 5',
        //         messages: [
        //             { sender: 'user', text: '你能做什么？' },
        //             { sender: 'system', text: '我可以帮助你回答问题、做任务等。' }
        //         ],
        //         conversation_id:10005,
        //     },
        // ],
        //“加载中”标志
        loading : false,
        //错误信息
        err : null,
        //用户ID
        user_id : null,
    }),
    actions: {
        // 添加新的对话
        addConversation(title) {
            this.conversations.push({
                title,
                messages: [] // 新对话的消息是空的
            });
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

