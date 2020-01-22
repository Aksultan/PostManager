import VueRouter from "vue-router";
import Posts from '../components/Posts'
import Auth from '../components/Auth'


const routes = [
    {path: '/', component: Auth},
    {path: '/posts', component: Posts}
]

export const router = new VueRouter({
    routes
})