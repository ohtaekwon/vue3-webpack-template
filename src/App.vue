<template>
  <h1>{{message}}</h1>
  <HelloWorld/>
</template>

<script>
import HelloWorld from '~/components/HelloWorld.vue'
// 객체 리터럴 반환
export default {
  components:{
    HelloWorld
  },
  data(){
    return {
      message:'Hello Vue!!!'
    }
  }
}
</script>
