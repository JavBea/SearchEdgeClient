// stores/conversations.js
import { defineStore } from 'pinia';

export const useConversationsStore = defineStore('conversations', {
    state: () => ({
        conversations: [
            {
                title: '对话 1', // 对话标题
                messages: [
                    { sender: '用户', text: '你好' }, // 用户的消息
                    { sender: '系统', text: '您好！有什么问题可以帮您解答？' } // 系统的回复
                ]
            },
            {
                title: '对话 2',
                messages: [
                    { sender: '用户', text: '今天的天气怎么样？' },
                    { sender: '系统', text: '今天是晴天，温度适宜。' }
                ]
            },
            {
                title: '对话 3',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 4',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 5',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 6',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 7',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 8',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 9',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 10',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 11',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 12',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 13',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            },
            {
                title: '对话 14',
                messages: [
                    { sender: '用户', text: '你能做什么？' },
                    { sender: '系统', text: '我可以帮助你回答问题、做任务等。' }
                ]
            }
        ],
    }),
    actions: {
        // 添加新的对话
        addConversation(title) {
            this.conversations.push({
                title,
                messages: [] // 新对话的消息是空的
            });
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

        // 获取指定对话
        getConversationByTitle: (state) => (title) => {
            return state.conversations.find(convo => convo.title === title);
        }
    }
});

