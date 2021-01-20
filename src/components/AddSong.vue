<template>


<div class="add-song">

    <button v-if="!showForm" @click="showForm=!showForm">Add Songs</button>
<form v-if="showForm" @submit.prevent="handleSubmit">
    <h4>Add A New Song</h4>
<input type="text" placeholder="Song Title" required v-model="title">
<input type="text" placeholder="Artist" required v-model="artist">
<button v-on:click="handleSubmit">Add</button>

</form>
</div>


</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'
export default {

props:['playList'],
setup(props){
    const title= ref("");
    const artist= ref("");
    const showForm= ref(false);
    const {updateDoc}=useDocument("playlists",props.playList.id);
const handleSubmit=async ()=>{
const newSong= {
title:title.value,
artist:artist.value,
id:Math.floor(Math.random()*1000000)
}
await updateDoc({
    songs:[...props.playList.songs,newSong]
})

title.value="";
artist.value="";
console.log(newSong)
}
    return {title,artist,showForm,handleSubmit}
}

}
</script>

<style>

</style>