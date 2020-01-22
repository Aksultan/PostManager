import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        logged_in: false,
        posts: [],
        users: []
    },

    getters:{
        POSTS : state => state.posts
    },

    mutations:{
        LOGIN : (state, payload) => {
            localStorage.setItem('auth-mail', payload)
            state.logged_in = true
            router.push("/posts")
        },

        SET_POSTS : (state, payload) => {   
            state.users.map(user=>{
                payload.map(post=>{
                    if(user.id === post.userId && !state.posts.some(x => post.id === x.id)){
                        state.posts.push({...user, ...post})
                    }
                })
            })
        },

        SET_USERS : (state, payload) => {
            state.users = payload
        },

        LOG_OUT : (state) => {
            state.logged_in = false
            localStorage.removeItem('auth-mail')
            router.push("/")
        }
    },

    actions: {
        
        AUTHORIZATION : async (context, payload ) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const json = await response.json()
            json.some(x => x.email === payload.email && x.id === parseInt(payload.password))?
            context.commit('LOGIN', payload.email):alert("Email or password is wrong")
        },

        GET_POSTS : async (context) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const json = await response.json()
            const response2 = await fetch('https://jsonplaceholder.typicode.com/users')
            const json2 = await response2.json()
            context.commit('SET_USERS', json2)
            context.commit('SET_POSTS', json)
        },
        
        LOG_OUT : (context) => {
            context.commit('LOG_OUT')
        },

        DELETE_POST :  (payload) => {
            console.log(payload)
             fetch('https://jsonplaceholder.typicode.com/posts/'+ 1, {
                method: 'DELETE'
            })
        }
    }

})