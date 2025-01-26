// stores/currentConversationIndex.js
import { defineStore } from 'pinia';

export const currentConversationIndexStore = defineStore('index', {
  state: () => ({
    index: 0,
  }),
  actions: {
    setIndex(index) {
      this.index = index;
    },
    reset() {
      this.index = 0;
    },
    doubleCount: (state) => state.count * 2 // 定义计算属性
  }
  }
);
