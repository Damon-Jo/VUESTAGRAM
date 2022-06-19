import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
        name : 'kim',
        age : 20,
        likes : 30,
        좋아요눌렀니 : false,
      
    }
  },
  // when button is clicked, the value of name will be changed to 'park'
  // 1. define the way to modify the state in the store.js
  // 2. when needing to modify, ask store.js to change
  mutations : {
    좋아요(state){
        if(state.좋아요눌렀니 == false){
            state.likes++;
            state.좋아요눌렀니 = true;
        } else {
            state.likes--;
            state.좋아요눌렀니 = false;
        }
    },
    이름변경(state){
        state.name = 'park'
    },
    나이변경(state, data){
        state.age += data
    }

  }
})

export default store