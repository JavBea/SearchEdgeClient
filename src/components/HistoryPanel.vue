<template>
    <div class="history-panel">
        <h3>历史对话</h3>
        <ul>
            <li
                v-for="conversation in conversations"
                :key="conversation.id"
                @click="selectConversation(conversation.id)"
            >
              {{ conversation.title }}
            </li>
        </ul>
    </div>
</template>

<script>
// // 引入 axios
// import axios from 'axios';
// // 使用 marked 库解析 Markdown
// import { marked } from "marked";

// 引用Pinia store中的数据
import {useCurrentConversationStore} from '@/stores/currentConversation';
import {useConversationsStore} from "@/stores/conversations";
import {useCurrentMessagesStore} from "@/stores/currentMessages";

export default {
    data() {
        //Pinia store
        const currentConversationStore = useCurrentConversationStore();
        const conversationsStore = useConversationsStore();
        const currentMessagesStore = useCurrentMessagesStore();

        return {

          //Pinia store
          currentConversationStore,
          currentMessagesStore,
          conversationsStore,
        };
    },
    computed: {

        // 全部的对话
        conversations() {
          return this.conversationsStore.allConversations
        },

    },

    methods: {

        // 根据ID选择历史对话的方法
        selectConversation(conversation_id) {
            //更新当前选中的对话ID
            this.currentConversationStore.setConversationId(conversation_id);
            //更新当前对话的全部信息
            this.currentMessagesStore.fetchMessages(conversation_id);
        },
    },
    created() {
      this.conversationsStore.fetchData('10000002');
    }
  };
</script>

<style>

  /* 历史对话侧栏格式 */
  .history-panel {
    width: 250px;
    background-color: #fff;
    padding: 20px;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
    height: 100%; /* 使侧栏的高度适应容器的高度 */
    overflow-y: auto; /* 当内容溢出时出现上下滚动条 */
  }

  /* 标题样式 */
  .history-panel h3 {
    margin-top: 0;
  }
  

  /* 历史对话列表样式 */
  .history-panel ul {
    list-style: none;
    padding: 0;
    margin: 0; /* 去掉外边距 */
  }

  /* 每一项的样式 */
  .history-panel li {
    cursor: pointer;
    padding: 10px;
    margin: 5px 0;
    background-color: #f9f9f9;
    border-radius: 4px;
  }

  /* 鼠标悬停样式 */
  .history-panel li:hover {
    background-color: #f1f1f1;
  }
  
  .history-panel li:hover {
    background-color: #f1f1f1;
  }
  /* end 历史对话侧栏格式 */
</style>
