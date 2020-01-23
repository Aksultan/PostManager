import VueRouter from "vue-router";
import Posts from '../components/Posts'
import Auth from '../components/Auth'
import PostInfo from '../components/PostInfo'


const routes = [
    {path: '/', component: Auth},
    {
        path: '/posts',
        component: Posts
    },
    {path: '/postInfo/:id', component: PostInfo}
]

export const router = new VueRouter({
    routes
})