// stores/currentMessages.js
import { defineStore } from 'pinia';
import axios from "axios";

export const useCurrentMessagesStore = defineStore('currentMessages', {
    state: () => ({
        messages: null,
        conversation_id: null,
        loading: false,
        err: null,
    }),
    actions: {
        async fetchMessages(conversation_id) {
            this.loading = true;
            this.conversation_id = conversation_id;
            this.err = null; // 每次请求前重置错误信息
            try {
                const response = await axios.post('http://127.0.0.1:5000/message/getallmessages',{"conversation_id":conversation_id});
                this.messages = response.data;
                return this.messages;
            } catch (error) {
                this.error = error;
                console.error(error);
            } finally {
                this.loading = false;
            }

        },
    },
    getters:{

    }
});
