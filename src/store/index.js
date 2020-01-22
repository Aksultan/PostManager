import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        logged_in: false
    },

    mutations:{
        LOGIN : (state, payload) => {
            localStorage.setItem('auth-mail', payload)
            state.logged_in = true
        },

        SET_POSTS : (state, payload) => {
            state.posts.push(payload)
        }
    },

    actions: {
        
        AUTHORIZATION : async (context, payload ) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const json = await response.json()
            json.some(x => x.email === payload.email && x.id === parseInt(payload.password))?
            context.commit('LOGIN', payload):alert("Email or password is wrong")
        },

        GET_POSTS : async (context, payload) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const json = await response.json()
            context.commit('POSTS', json)
        }
    }

})