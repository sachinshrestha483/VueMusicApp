<template>
  <div class="home">

    <p>Home page</p>
   <div v-if="error" class="error">{{error}}</div>
<ListView :playlists="documents" />
 
  </div>
</template>

<script>
import { ref } from 'vue';
import ListView from '../components/ListView'
// @ is an alias to /src
import getCollection from "../composables/getCollection"


export default {
  name: 'Home',
  components: {
    ListView
   
  },
  setup(){
const docu=ref([]);
  const { error, documents}=  getCollection("playlists");





  return{documents,error}
  }
   
}
</script>
