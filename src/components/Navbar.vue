<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user != null">

          <router-link :to="{name:'UserPlaylists'}"> My PlayList</router-link>

          <button disabled>Hello {{ user.displayName }}</button>

<router-link :to="{name:'CreatePlaylist'}">Create a Playlist</router-link>

          <div v-if="isPending">
            <button disabled>Logging Out</button>
          </div>
          <div v-else>
            <button v-on:click="logout">Logout</button>
          </div>
        </div>

        <div v-else>
          <router-link class="btn" :to="{ name: 'SignUp' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

import { watch } from "vue";
export default {
  setup() {
    const { error, logout, isPending } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      console.log("User  Logout ho  Gaya");
      if (user.value == null) {
        router.push({ name: "Login" });
      }
    });

    return { logout, isPending, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>