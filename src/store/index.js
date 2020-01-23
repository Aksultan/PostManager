import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        logged_in: false,
        posts: [],
        users: [],
        post: [],
        comments: [],
        user: [],
        user_posts: [],
        user_comments: []
    },

    getters:{
        POSTS : state => state.posts,
        POST : state => state.post,
        COMMENTS : state => state.comments,
        USER : state => state.user,
        USER_POSTS : state => state.user_posts,
        USER_COMMENTS : state => state.user_comments,
    },

    mutations:{
        LOGIN : (state, payload) => {
            localStorage.setItem('auth-mail', payload.email)
            localStorage.setItem('auth-id', payload.password)
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

        SET_POST : (state, payload) => {    
            state.posts.filter(post => {
                if(post.id == payload)
                    state.post = post  
            })
        },

        SET_COMMENTS : (state, payload) => {
            state.comments = payload
        },

        SET_USER : (state, payload) => {
            state.user = payload
        },

        SET_USER_POSTS : (state, payload) => {
            state.user_posts = []
            state.posts.map(post => {
                console.log(post.userId === parseInt(payload))
                if(post.userId === parseInt(payload) && state.user_posts.length < 5)
                    state.user_posts.push(post)
            })
        },

        SET_USER_COMMENTS : (state, payload) => {
            state.posts.map(post => {
                state.comments.map(comment => {
                    if(post.id === comment.postId && post.userId === parseInt(payload) && !state.user_comments.some(x => comment.id === x.id))
                        state.user_comments.push(comment)
                })
            })
        },

        LOG_OUT : (state) => {
            state.logged_in = false
            localStorage.removeItem('auth-mail')
            localStorage.removeItem('auth-id')
            router.push("/")
        }
    },

    actions: {
        
        AUTHORIZATION : async (context, payload ) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const json = await response.json()
            json.some(x => x.email === payload.email && x.id === parseInt(payload.password))?
            context.commit('LOGIN', payload):alert("Email or password is wrong")
        },

        LOG_OUT : (context) => {
            context.commit('LOG_OUT')
        },

        GET_POSTS : async (context) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const json = await response.json()
            const response2 = await fetch('https://jsonplaceholder.typicode.com/users')
            const json2 = await response2.json()
            context.commit('SET_USERS', json2)
            context.commit('SET_POSTS', json)
        },

        GET_POST : (context, payload) => {
            context.commit('SET_POST', payload)
        },

        DELETE_POST : async (context, payload) => {
            await fetch('https://jsonplaceholder.typicode.com/posts/'+ payload, {
                method: 'DELETE'
            }).then(response => alert("Response status : " + response.status +"\nCurrent post id : "+ payload))
        },

        ADD_POST : async (context, payload) => {
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => alert("Response status : " + response.status +"\nCurrent post info : "+ JSON.stringify(payload)))
        },

        EDIT_POST : async (context, payload) => {
            await fetch('https://jsonplaceholder.typicode.com/posts/' + payload.id, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              }).then(response => alert("Response status : " + response.status +"\nCurrent post info : "+ JSON.stringify(payload)))
        },

        GET_COMMENTS : async (context, payload) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId='+ payload)
            const json = await response.json()
            context.commit('SET_COMMENTS', json)
        },

        GET_USER : async (context, payload) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/'+ payload)
            const json = await response.json()
            context.commit('SET_USER', json)
        },
        
        GET_USER_RELATED_POSTS : (context, payload) => {
            context.commit('SET_USER_POSTS', payload)
        },
        
        GET_USER_RELATED_COMMENTS : (context, payload) => {
            context.commit('SET_USER_COMMENTS', payload)
        }
        
    }

})