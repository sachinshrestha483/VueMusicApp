import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/auth/login'
import Signup from '../views/auth/Signup'
import CreatePlayList from '../views/playlists/CreatePlayList'
import playlistDetails  from "../views/playlists/playlistDetails"
import userPlayList from "../views/playlists/userPlayList"


// route guard

import {projectAuth} from '../firebase/config'

const requireAuth=(to,from,next)=>{
  let user =projectAuth.currentUser;

  if(!user){
    next({name:'Login'})
  }
  else{
    next();
  }

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter:requireAuth
  },
   {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup
  },
  {
    path:'/playlist/create',
    name:'CreatePlaylist',
    component:CreatePlayList,
    beforeEnter:requireAuth

  },
  {
    path:'/Playlist/:id',
    name:'PlaylistDetails',
    component:playlistDetails,
    beforeEnter:requireAuth,
    props:true

  },
  {
    path:'/playlists/user',
    name:'UserPlaylists',
    component:userPlayList,
    beforeEnter:requireAuth,


  }

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
