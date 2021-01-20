<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
      />
        <editor
        v-model="description"
       api-key="dqmesquky3zxf9m3uipmxhl2racwrbe5276vsy1h1bvzm5d3"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     />
      
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" multiple @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isuploading">Create</button>
      <button disabled v-else>Uploading....</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
// '@' => means The Root of the Application...

// './' same folder me hai file

import getUser from "@/composables/getUser";
import useStorage from "@/composables/useStorage";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composables/useCollection";
 import Editor from '@tinymce/tinymce-vue'
import { useRouter } from 'vue-router';

export default {

  

  components: {
     'editor': Editor
   },
  setup() {

    const router= useRouter();
    
    const { filePath, url, uploadImage } = useStorage();
    // require file path to store to delete thephoto..
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();


    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isuploading = ref(false);
    const handleSubmit = async () => {
      if (file.value) {
        console.log(title.value, description.value, file.value);

        isuploading.value = true;

        await uploadImage(file.value);
       const res= await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isuploading.value = false;

        if (!error.value) {

          console.log("playList Added");
console.log(res);
        router.push({name:'PlaylistDetails',params:{id:res.id}})

        }
      } else {
        fileError.value = "File Not Selected";
      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      // e.target.files is an array as we need just one value we do it by
      // just one file e.targer.files[0]
      // for acesing an we need to go to e.trget.files
      const selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = "Please Selet an Image File (png/jpg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isuploading,
      
    };
  },
};
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>