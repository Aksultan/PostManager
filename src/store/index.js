import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        logged_in: false,
        posts: []
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
            state.posts.push(payload)
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
            context.commit('POSTS', json)
        },

        LOG_OUT : (context) => {
            context.commit('LOG_OUT')
        }
    }

})