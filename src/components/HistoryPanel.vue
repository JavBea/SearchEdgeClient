<template>
    <div class="history-panel">
        <h3>历史对话</h3>
        <ul>
            <li
                v-for="(conversation, index) in conversations"
                :key="index"
                @click="selectConversation(index)"
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
import {currentConversationIndexStore} from '@/stores/currentConversationIndex';

export default {
    data() {
        return {
        // 引用Pinia中的数据
          currentConversationIndexStore: currentConversationIndexStore(),
        
        // 历史对话数据：每个对话包含一个标题和多条消息
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
        };
    },

    methods: {
        
        // 选择历史对话的方法
        selectConversation(index) {
            // 通过Pinia store 更新当前选中的对话索引为用户点击的对话索引
            this.currentConversationIndexStore.setIndex(index);
        },
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
