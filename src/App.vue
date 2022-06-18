<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step ==1" @click="step++">Next</li>
      <li v-if="step ==2" @click="publish">발행</li>

    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :이미지="이미지" :게시물="게시물" :step="step"/>
  <Container @write="작성한글 = $event" />
  <button @click="more">더보기</button>


  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" accept="image/*" type="file" id="file" class="inputfile" /> <!--multiple쓰면 input여러개, accept 이미지만선택하게-->

      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

<!-- 동적인 UI만드는법  == Tab 만들기 -->
<!-- 1.UI 현재 상태를 데이터로 만들기 -->
<!-- 2.상태에 따라서 HTML이 어떻게 보일지 -->
  <!-- <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->



</template>

<script>
import Container from './components/ContainerV'
import postdata from './assets/postdata'
import axios from 'axios'


export default {
  name: "App",
  data(){
    return {
      step : 0, //UI현재 상태를 데이터로 만들기
      게시물 : postdata,
      더보기 : 0,
      이미지 : '',
      작성한글 : '',
      선택한필터 : ''
    }

  },
  //FilterBox에서 발사한거 받는 곳, 작명이라는 이밴트를 발사하면 안에 코드 실행
  mounted(){
    this.emitter.on('박스클릭함', (a)=>{
      this.선택한필터 = a
      console.log(a)
    })
  },


  components: {
    Container,
  },
  methods : {
    publish(){
      var 내게시물 ={
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터
      };
      this.게시물.unshift(내게시물);
      this.step = 0;
    },
    more(){
      // axios.post('URL', {name : 'kim'}).then().catch((err)=>{
      //   err

      // })

       axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
       .then((결과)=>{
         this.게시물.push(결과.data); // 요청 성공시 실행할 code , push 는 array에다가 데이터 추가
         this.더보기++;
         
       })
    },
    upload(e){
      let 파일 = e.target.files;
      console.log(파일[0]);
      let url = URL.createObjectURL(파일[0]);
      this.이미지 = url;
      this.step++; //사진 업로드 하는순간 다음페이지로 이동
    }
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
