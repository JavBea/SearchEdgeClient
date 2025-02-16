<template>
  <div class="history-panel" :class="{'collapsed': isCollapsed}">
    <!-- 顶部区域，包含加号图标 -->
    <div class="header">
      
      <el-button :icon="OfficeBuilding" @click="togglePanel" circle />
      <el-button :icon="Plus" circle />
      <!-- <button class="icon-button">+</button> -->
      <!-- <button class="icon-button">+</button> -->
    </div>
    
    <h3 v-if="!isCollapsed">历史对话</h3>
    <ul v-if="!isCollapsed">
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
import { useCurrentConversationStore } from '@/stores/currentConversation';
import { useConversationsStore } from "@/stores/conversations";
import { useCurrentMessagesStore } from "@/stores/currentMessages";
import { Plus,OfficeBuilding} from '@element-plus/icons-vue';

export default {
  data() {
    const currentConversationStore = useCurrentConversationStore();
    const conversationsStore = useConversationsStore();
    const currentMessagesStore = useCurrentMessagesStore();

    return {
      currentConversationStore,
      currentMessagesStore,
      conversationsStore,
      Plus,
      OfficeBuilding,
      isCollapsed: false, // 控制面板是否收起
    };
  },
  computed: {
    conversations() {
      return this.conversationsStore.allConversations;
    },
  },
  methods: {
    // 切换历史对话栏的显示/隐藏
    togglePanel() {
      this.isCollapsed = !this.isCollapsed;
    },
    selectConversation(conversation_id) {
      this.currentConversationStore.setConversationId(conversation_id);
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
  box-sizing: border-box;
  height: 100%; /* 使侧栏的高度适应容器的高度 */
  overflow-y: auto; /* 当内容溢出时出现上下滚动条 */
  transition: width 0.3s ease; /* 控制宽度的动画效果 */
}

.history-panel.collapsed {
  width: 0; /* 隐藏时将宽度设置为0 */
  padding: 0; /* 隐藏时去掉内边距 */
}

/* 顶部区域 */
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #fff; 
}

.icon-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.icon-button:hover {
  background-color: #dcdcdc; /* 鼠标悬停时背景变深 */
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
  border: none; /* 取消边界 */
}

/* 鼠标悬停时高亮 */
.history-panel li:hover {
  background-color: #f1f1f1;
}
</style>
