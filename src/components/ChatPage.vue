<template>
  <div class="chat-container">
    <!-- 左侧：历史对话选择栏 -->
    <HistoryPanel></HistoryPanel>
    <!-- 右侧：对话部分 -->
    <div class="chat-panel">

      <!-- 右上角登录链接 -->
      <div v-if="userStore.user?.user_name" class="user-avatar" @click="drawer = true">
        <el-avatar class="avatar">{{ userStore.user.user_name.charAt(0).toUpperCase() }}</el-avatar>
      </div>
      <div v-else class="login-link">
        <router-link to="/login">登录</router-link>
      </div>

      <!-- 四个选择设定小组件 -->
      <div class="choice-set-container">
        <!-- 第一个组件：选择大模型系列 -->
        <el-select
          v-model=llm
          placeholder="Select"
          size="large"
          style="width: 120px"
          @change="modelDefaultSelect"
        >
          <el-option
            v-for="item in llm_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div style="padding: 10px;"></div>


        <!-- 第二个组件：选择具体模型 -->
        <el-select
          v-model=model
          placeholder="Select"
          size="large"
          style="width: 120px"
          :disabled="!llm"
        >
          <el-option
            v-for="item in filteredModelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div style="padding: 10px;"></div>

        <el-text>
          函数调用
          <el-switch v-model="func_on" />
        </el-text>

        <div style="padding: 7px;"></div>

        <el-text>
          启发式规则
          <el-switch v-model="heu_on" />
        </el-text>

        <el-button  :icon="Setting" @click="openHeuSettings" circle></el-button>

      </div>

      <!-- 显示对话内容 -->

      <el-scrollbar>
        <div class="chat-content">
          <!-- 遍历 currentConversation.messages 数组，每个元素对应一条消息 -->
          <div
            v-for="(message, index) in currentMessages"
            :key="index"
            class="message"
            :class="{
              'system-message': message.sender === 'system',
              'user-message': message.sender === 'user'
            }"
          >
            <!-- 显示发送者的名字 -->
            <strong>{{ message.sender }}:</strong>
            <!-- 显示消息的内容 -->
            <div v-html="message.message_content"></div>
          </div>

        </div>
      </el-scrollbar>

      <!-- 输入框 -->
      <div class="input-area">
        <textarea v-model="newMessage" placeholder="输入消息..." rows="3"></textarea>
        <el-button @click="sendPostRequest" class=".sendbutton" v-loading="this.resLoading" round>发送</el-button>
      </div>
    </div>

    <!-- 右侧抽屉 -->
    <el-drawer
        v-model="drawer"
        title="I am the title"
        size="15%"
    >

      <template #title>
        <div>
          <span style="font-weight: bold; font-size: 16px; color: black;">{{ this.userStore.user.user_name }}</span>
          <div style="color: gray; font-size: 12px;">ID: {{ this.userStore.user.user_id }}</div>
        </div>
      </template>

      <!-- 用户相关操作 -->
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="15" height="15">
            <path fill="currentColor" d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0">
            </path>
          </svg>
          <div style="padding: 7px;"></div>
          <el-text>账户</el-text>
        </el-menu-item>

        <router-link to="/login" style="text-decoration: none;">
          <el-menu-item index="2">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="15" height="15">
              <path fill="f51b1b " d="M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z"></path>
              <path fill="f51b1b " d="M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32"></path>
            </svg>
            <div style="padding: 7px;"></div>
            <el-text>
              登出
            </el-text>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-drawer>
  </div>
</template>


<script>
// 引入 axios
import axios from 'axios';
import {h, ref} from 'vue';
// 使用 marked 库解析 Markdown
import { marked } from "marked";
import HistoryPanel from './HistoryPanel.vue'; 

// 引用Pinia store中的数据
import {useCurrentConversationStore} from '@/stores/currentConversation';
import {useConversationsStore} from "@/stores/conversations";
import {useUserStore} from "@/stores/user.js";
import {useCurrentMessagesStore} from "@/stores/currentMessages";
import {Setting, Document, Menu, SwitchButton} from '@element-plus/icons-vue';
import {ElCol, ElMessage, ElMessageBox, ElRow, ElSwitch} from "element-plus";


// 选择的大模型
const llm = ref(null); 

// 选择的模型
const model= ref(null); 

// 分别对应 “函数调用” 和 “启发式规则” 的开关状态
const func_on = ref(true);
const heu_on = ref(true);

//右侧抽屉打开状态
const drawer = ref(false);

//loading boolean
const resLoading =ref(false);


export default {
  name: 'ChatPage',
  components: {
    HistoryPanel
  },
  created() {
    this.currentConversationStore = useCurrentConversationStore();
    this.conversationsStore = useConversationsStore();
    this.userStore = useUserStore();
    this.currentMessagesStore = useCurrentMessagesStore();

    console.log(this.userStore.user);
    console.log(this.userStore.user.user_id);

    this.conversationsStore.fetchData(this.userStore.user.user_id);
    this.conversations=this.conversationsStore.allConversations;
    this.currentMessagesStore.fetchMessages(this.conversations?.[0]?.id);
  },
  data() {

    //Pinia store

    return {

      //Pinia store
      currentConversationStore: null,
      conversationsStore: null,
      userStore: null,
      currentMessagesStore: null,

      //全部会话
      conversations: null,

      //当前登录的用户
      // currentUser: userStore.getCurrentUser,

      func_on,

      heu_on,

      llm,

      model,

      drawer,

      //loading boolean
      resLoading,

      //icon
      Setting, Document, Menu, SwitchButton,

      showDialog: false,

      // 大模型系列选项
      llm_options: [
        { label: 'ChatGPT', value: 'chatgpt' },
        { label: '通义千问', value: 'qwen' },
        { label: 'DeepSeek', value: 'deepseek' }
      ],

      // 根据大模型系列选择的具体模型选项
      model_options: {
        chatgpt: [
          { label: 'gpt-4o', value: 'gpt-4o' },
          { label: 'gpt-4o mini', value: 'gpt-4o mini' }
        ],
        qwen: [
          { label: 'qwen-plus', value: 'qwen-plus' },
          { label: '模型2-2', value: 'model2-2' }
        ],
        deepseek: [
          { label: 'DeepSeek-r1:7b', value: 'deepseek-r1:7b' },
          { label: 'DeepSeek-r1:32b', value: 'DeepSeek-r1:32b' }
        ]
      },

      //启发式规则选择
      heus: [false,false,false,false],

      heu_list:{
        "SIMPLEJUDGE":false,
        "MULTIQUERY":false,
        "FUNCTIONCALL":false,
        "PEEREXAMINEE":false
      },
      postData: { conversation_id:null, query: 'Who are you?', llm: 'chatgpt', model:'gpt-4o', func_on:true, heu_on:true, heu_list:this.heu_list}, // 要发送到后端的数据
      response: null, // 用于保存后端返回的数据

      // 新消息输入框中的内容
      newMessage: '',
      // 后端传入的新消息中的内容
      responseMessage: ''
    };
  },
  computed: {

    // 计算属性：当前选中的对话
    currentConversation() {
      return this.conversationsStore.getConversationById(this.currentConversationStore.getCurrentConversationId)
    },

    // 计算属性：当前选中的对话中的信息
    currentMessages() {
      //获取信息并返回
      return this.currentMessagesStore.messages;
    },

    // 计算属性，返回根据第一个 select 的值过滤后的第二个 select 的选项
    filteredModelOptions() {
      if (this.llm) {
        return this.model_options[this.llm] || [];
      }
      
      return [];
    }

  },
  methods: {
    // 计算“具体模型选择”的默认属性
    modelDefaultSelect(value) {
      if (this.llm && this.model_options[this.llm] && this.model_options[this.llm].length > 0) {
        this.model=this.model_options[this.llm][0].label;
      }else{
        this.model=null; // 如果没有找到该系列或没有模型，返回空字符串
      }
      console.log("选中的值是：", value);
      // 在这里可以执行其他逻辑
    },

    // 发送请求方法
    async sendPostRequest() {

      this.resLoading=true;
      
      // 检查 newMessage 是否为空或仅包含空格
      if (this.newMessage.trim()) {
        // 构造一条新消息
        const newMsg = { sender: 'user', message_content: marked(this.newMessage) };
        // 将新消息添加到当前对话的消息列表中
        this.currentMessagesStore.messages.push(newMsg);
        // 更新要发送到后端的数据
        this.postData.conversation_id = this.currentConversationStore.conversation_id;
        this.postData.query = this.newMessage;
        this.postData.llm = this.llm;
        this.postData.model = this.model;
        this.postData.func_on = this.func_on;
        this.postData.heu_on = this.heu_on;
        this.postData.heu_list = this.heu_list;


        // 清空输入框
        this.newMessage = '';
      }

      try {
        // 使用 axios 发送 POST 请求
        const res = await axios.post('http://127.0.0.1:5000/llm/query', this.postData);
        // 保存后端返回的数据
        this.response = res.data;
        let content = this.response.content;

        if(this.heu_on && (this.heu_list.FUNCTIONCALL||this.heu_list.MULTIQUERY||this.heu_list.SIMPLEJUDGE||this.heu_list.PEEREXAMINEE)){
          // 从响应数据中提取heu_result
          const heuResult = this.response.heu_result;

          // // 将heu_result的各字段命名为a、b、c、d
          // const a = heuResult.SIMPLEJUDGE;
          // const b = heuResult.MULTIQUERY;
          // const c = heuResult.FUNCTIONCALL;
          // const d = heuResult.PEEREXAMINEE;
          //
          // // 将所有的值放进一个数组中
          // const values = [a, b, c, d];
          //
          // // 过滤掉null的值
          // const filteredValues = values.filter(value => value !== null);
          //
          // // 计算非null值的平均值
          // const average = filteredValues.length > 0 ? filteredValues.reduce((sum, value) => sum + value, 0) / filteredValues.length : null;
          //
          // content += `\n\n---\n\n`;
          // content += `综合可信度: ${average}\n`;


          // 将heu_result的内容追加到content尾部，并添加换行和分割线
          content += `<br><br>\n\n---\n\n`;
          content += `可靠性评定:<br>`;
          content += `    ***简约判定策略:*** ${heuResult.SIMPLEJUDGE}<br>`;
          content += `    ***多反馈策略:*** ${heuResult.MULTIQUERY}<br>`;
          content += `    ***函数调用策略:*** ${heuResult.FUNCTIONCALL}<br>`;
          content += `    ***多模型交互策略:*** ${heuResult.PEEREXAMINEE}<br>`;

        }


        // 将后端返回的消息添加到当前对话的消息列表中
        this.responseMessage = marked(content);
        const newMsg = { sender: 'system', message_content: this.responseMessage };
        this.currentMessagesStore.messages.push(newMsg);


        this.resLoading=false;
        console.log('后端响应:', this.response);

      } catch (error) {

        console.error('请求失败:', error);

      }
      this.postData.query = 'Who are you?'; // 重置 query 字段
    },

    //
    // 打开启发式规则配置栏
    openHeuSettings() {
      ElMessageBox({
        title: '启发式规则',
        message: () =>
            h('div', {style: 'align-items: center;' }, [
              h(ElRow, { gutter: 20 , style: 'align-items: center;'}, [
                h(ElCol, { span: 24 }, [
                  h('div', { style: 'display: flex; align-items: center;' }, [
                    h('span', { style: 'margin-right: 24px;' }, '函数调用策略\t'),  // 左侧注释文本
                    h(ElSwitch, {
                      modelValue: this.heu_list.FUNCTIONCALL,
                      'onUpdate:modelValue': (val) => {
                        this.heu_list.FUNCTIONCALL = val
                      },
                    })
                  ])
                ]),
                h(ElCol, { span: 24 }, [
                  h('div', { style: 'display: flex; align-items: center;' }, [
                    h('span', { style: 'margin-right: 38px;' }, '多反馈策略\t'),
                    h(ElSwitch, {
                      modelValue: this.heu_list.MULTIQUERY,
                      'onUpdate:modelValue': (val) => {
                        this.heu_list.MULTIQUERY = val
                      },
                    })
                  ])
                ]),
                h(ElCol, { span: 24 }, [
                  h('div', { style: 'display: flex; align-items: center;' }, [
                    h('span', { style: 'margin-right: 10px;' }, '多模型交互策略\t'),
                    h(ElSwitch, {
                      modelValue: this.heu_list.PEEREXAMINEE,
                      'onUpdate:modelValue': (val) => {
                        this.heu_list.PEEREXAMINEE = val
                      },
                    })
                  ])
                ]),
                h(ElCol, { span: 24 }, [
                  h('div', { style: 'display: flex; align-items: center;' }, [
                    h('span', { style: 'margin-right: 24px;' }, '简约判定策略'),
                    h(ElSwitch, {
                      modelValue: this.heu_list.SIMPLEJUDGE,
                      'onUpdate:modelValue': (val) => {
                        this.heu_list.SIMPLEJUDGE = val
                      },
                    })
                  ])
                ]),
              ])
            ]),

        // 其他配置选项
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          // 在关闭弹窗前的清理工作
          if (action === 'cancel') {
            // 处理取消的操作
            console.log('Cancelled');
          }
          done(); // 确保弹窗能够正常关闭
        },
      })
          .then(() => {
            ElMessage({
              type: 'success',
              message: 'Changes saved.',
            })
          })
          .catch((action) => {
            const message = action === 'cancel'
                ? 'Changes discarded.'
                : 'Stay in the current route';

            ElMessage({
              type: 'warning',
              message,
            });
          })

    }

  },
  //钩子函数
  mounted() {
    //更新会话数据
    console.log(this.conversationsStore);
    // this.conversationsStore.fetchData('10000002');
    console.log(this.currentMessagesStore);
    // this.currentMessagesStore.fetchMessages('10001');
  },

};
</script>

  
<style scoped>

   /* 整体的外部套件 */
  .chat-container {
    display: flex;
    height: 96vh; /* 设置为视口高度，确保容器始终填充整个窗口 */
    background-color: #ffffff;/* #f4f4f4 */
    overflow: hidden; /* 防止出现滚动条 */
  }


  /* 对话显示的套件 */
  .chat-content {
    display: flex;
    flex-direction: column;
    height: 100%; /* 设置高度，便于滚动条的显示 */
    overflow-y: auto; /* 启用垂直滚动条 */
    padding-right: 10px; /* 添加右侧内边距，避免滚动条遮挡内容 */
    direction: ltr; /* 设置滚动条方向为右到左 */
  }

  .chat-content > * {
    direction: ltr; /* 保证子元素的文本方向不受影响 */
  }

  /* 消息格式 */
  .message {
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    max-width: 70%;
  }
   
  .message strong {
    color: #007BFF
  }

  /* 系统消息格式 */
  .system-message {
    text-align: left;
    background-color: #f5f5f5;
    align-self: flex-start; /* 左对齐 */
    width: 1000px;
  }

  /* 用户消息格式 */
  .user-message {
    text-align: right;
    background-color: #d1e7dd;
    align-self: flex-end; /* 右对齐 */
    width: 550px;
    text-align: left;
  }
  /* end 消息格式 */



  .chat-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }
  
  /* 用户登录链接格式*/
  .login-link {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .input-area {
  display: flex;
  align-items: center;
  position: relative; /* 使按钮能够在输入框内部定位 */
  }

  textarea {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px; /* 给按钮留出空间 */
    resize: none;
    overflow-y: auto; /* 当文本超出时出现滚动条 */
  }

  .sendbutton {
    position: absolute;
    right: 10px; /* 将按钮定位到输入框右侧 */
    top: 50%;
    transform: translateY(-50%); /* 垂直居中 */
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* 发送按钮鼠标悬停格式 */
  .sendbutton:hover {
    background-color: #0056b3;
  }


  /* 三个小组件 */
  .top-settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .model-select {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .model-select select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  /* 函数调用开关的样式 */
  .toggle-switch {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* “设置开关” 的样式 */
 
  .choice-set-container {
    display: flex;
    align-items: center; /* 让子元素在垂直方向居中对齐 */
    justify-content: flex-start; /* 水平方向上靠左对齐 */
    padding: 10px;
    height: 30px;
  }


  /* 一个更好的聊天气泡？ */
  .LeftmsgBoxOut .msgContent{
    display: inline-block;
    min-width: 100px;
    margin-top: 2%;
    padding:5px 8px;
    border-radius: 5px;
    background-color: #5a64c1;
    width: auto;
    max-width: 500px;
    font-family: SourceHanSansCN-Medium;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #e9e9e9;
    position: relative;
 }
.RightmsgBoxOut .msgContent{
    display: inline-block;
    min-width: 100px;
    margin-top: 2%;
    padding:5px 8px;
    border-radius: 5px;
    background-color: #5a64c1;
    width: auto;
    max-width: 500px;
    font-family: SourceHanSansCN-Medium;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #e9e9e9;
    position: relative;
 }
.LeftmsgBoxOut .msgContent::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left:10px;
    top:-18px;
    border: 10px solid;
    border-color: transparent  transparent #5a64c1 transparent ;
}
.LeftmsgBoxOut .msgContent::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left:10px;
    top:-18px;
    border: 10px solid;
    border-color: transparent  transparent #5a64c1 transparent ;
}
.RightmsgBoxOut .msgContent::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right:12px;
    top:-18px;
    border: 10px solid;
    border-color: transparent  transparent #5a64c1 transparent ;
}
.RightmsgBoxOut .msgContent::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right:12px;
    top:-18px;
    border: 10px solid;
    border-color: transparent  transparent #5a64c1 transparent ;
}


 .header {
   display: flex;
 }

 .user-avatar {
   position: absolute;
   right: 20px;
   top: 20px;
   font-size: 14px;
   margin-bottom: 10px;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background-color: #2980b9;
   color: white;
   font-size: 18px;
   font-weight: bold;
 }

 .avatar {
   background-color: #2980b9 !important;
   color: white !important;
   font-size: 18px !important;
 }

</style>
  