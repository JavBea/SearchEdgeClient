// stores/currentConversationIndex.js
import { defineStore } from 'pinia';

export const useCurrentConversationIndexStore = defineStore('index', {
    state: () => ({
      index: 0,
    }),
    actions: {
      setIndex(index) {
        this.index = index;
      },
      reset() {
        this.index = 0;
      }
    }
  }
);
