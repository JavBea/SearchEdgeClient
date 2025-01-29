// stores/currentConversation.js
import { defineStore } from 'pinia';

export const useCurrentConversationStore = defineStore('currentConversation', {
    state: () => ({
        conversation_id:10001,
    }),
    actions: {
        setConversationId(conversation_id) {
            this.conversation_id = conversation_id;
        },
        reset() {
        this.conversation_id = null;
        }
    },
    getters: {
        getCurrentConversationId(state){
            return state.conversation_id;
        }
    }
  }
);
