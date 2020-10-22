<template>
  <div id="app">
  
    <router-view />

    <!-- 设置视频自动播放muted 属性为了在chorme可以自动播放视频autoplay 视屏自动播放loop 视频循环播放 -->
  </div>
</template>
<script>

export default{
  data () {
    return {
      // input: ''
    }
  },
  mounted () {
    console.log(111);
    
  }
}
</script>
<style>
#nprogress .bar { /*进度条样式*/
        background: hotpink !important;
    }

.spinner-icon {/*圆圈样式*/
    border-top-color: #f56c6c!important;
    border-left-color: #003df1!important;
}
</style>
