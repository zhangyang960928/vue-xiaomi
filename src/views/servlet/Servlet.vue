<template>
  <div>
    <div class="upon">
      <div class="one">支持拖拽</div>
      <!-- UI自带上传的方式 -->
      <div class="two displayF align-itemsC">Element UI自带上传组件</div>
      <el-upload class="upload-demo" drag action="/api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div class="four">支持剪裁</div>
      <div class="six displayF align-itemsC">vue-image-crop-upload</div>
      <div id="image">
        <!--上传图片的按钮-->
        <el-button type="primary" @click="toggleShow" >上传图片</el-button>
        <!--组件主体-->
        <my-upload
          field="file"
          @crop-success="cropSuccess"
          v-model="show"
          :width="400"
          :height="200"
          img-format="jpg"
          :size="size"
          url='/api/upload'
        ></my-upload>
        <!-- <img :src="avatar" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      avatar: "", //用于存储剪切完图片的base64Data和显示回调图片
      show: false, //剪切框显示和隐藏的flag
      size: 2.1,
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    // 点击上传图片
    toggleShow() {
      this.show = !this.show;
    },
    //剪切成功后的回调函数
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是图片的base64data码
      this.avatar = imgDataUrl;
      console.log(imgDataUrl); //这里打印出来的是base64格式的资源
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.upon {
  background: white;
  padding-top: 20px;
  padding-bottom: 50px;
  border-radius: 3px;
  .one {
    font-size: 25px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .two {
    width: 1100px;
    margin-left: 20px;
    background: #eeeeee;
    height: 50px;
    margin-bottom: 20px;
    font-size: 14px;
    padding-left: 30px;
  }
  .four {
    font-size: 25px;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .six {
    width: 1100px;
    margin-left: 20px;
    background: #eeeeee;
    height: 50px;
    margin-bottom: 20px;
    padding-left: 30px;
    font-size: 14px;
  }
}
.upload-demo {
  margin-left: 20px;
}
#image {
  margin-left: 20px;
}
</style>