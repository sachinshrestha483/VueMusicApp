<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isPending">
    <button disabled>Logging in ....</button>

    </div>

    <div v-else>
    <button>Log in</button>

    </div>

  </form>
</template>

<script>
// using @ means start at the project src root
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {

    const router=useRouter();
    const { error, login,isPending } = useLogin()
    const email = ref('')
    const password = ref('')
    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {

        console.log('user logged in')
        router.push({name:"UserPlaylists"})
      }
    }
    return { email, password, handleSubmit, error,isPending }
  }
}
</script>