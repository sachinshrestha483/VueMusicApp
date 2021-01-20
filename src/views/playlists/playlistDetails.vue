<template>
  <div class="error" v-if="!document">Document Dont Exist</div>
 
  <div v-if="document" class="playlist-details">

    <!-- Playlist info -->

    <div class="playlist-info">
      <div class="cover">
        <img :src="document.coverUrl" />
      </div>
      <h2>{{ document.title }}</h2>
      <p class="username">Created By {{ document.displayName }}</p>
      <p class="description">{{ document.description }}</p>
<div  v-if="ownership">
    <p>Delete The PlayList</p>
  <button @click="handleDelete" >Delete</button>

</div>
    

    </div>

    <div class="song-list">
  <p>Songs Here</p>
 <div v-if="!document.songs.length">
     No Songs Have Been Added to This Playlist Yet
 </div>

<div v-for="song in document.songs"  :key="song.id" class="singleSong">

<h2>{{song.title}}</h2>
<p>{{song.artist}}</p>
<button v-if="ownership" v-on:click="deleteSong(song.id)">Delete</button>
</div>

<div v-if="ownership"> 
  <AddSong :playList="document" />

</div>
  </div>
  </div>

  
</template>

<script>
import useStorage from '@/composables/useStorage'
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser"
import { compile, computed } from 'vue';
import useDocument from "@/composables/useDocument"
import { useRouter } from 'vue-router';
import AddSong from "@/components/AddSong";
export default {
  props: ["id"],
  components:{AddSong},
  setup(props) {

const {user}= getUser();
const{deleteImage}=useStorage()
const {deleteDoc,updateDoc}= useDocument('playlists',props.id)

    const { error, document } = getDocument("playlists", props.id);
const router= useRouter();
const ownership= computed(()=>{
return document.value && user.value && user.value.uid==document.value.userId 
})

const deleteSong=async(id)=>{
console.log(id)
let newArr= document.value.songs.filter((e)=>{
    return e.id!=id
})
console.log("new Array:");
console.log(newArr)
await updateDoc({
    songs:[...newArr]
})

console.log("Delete Id is:"+id);

}


const handleDelete=async()=>{
    await deleteImage(document.value.filePath);
   
   await deleteDoc();

   router.push({name:'Home'})
}



return { error, document,ownership,handleDelete,deleteSong };
  },
};
</script>

<style scoped>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
</style>