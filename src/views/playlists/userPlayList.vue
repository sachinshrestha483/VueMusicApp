<template>
  <h1>User PlayList</h1>
<router-link class="btn" :to="{name:'CreatePlaylist'}">
Create A New PLayList
</router-link>

<ListView   :playlists="playlists"  />
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView"
export default {

components:{   

ListView,

},

  setup() {
    const { user } = getUser();
    // can call documeants as a playlist..
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);
console.log("Playlists")
    console.log(playlists)

    return {playlists}
  },
};
</script>

<style scoped>
</style>