// // import { Store } from 'vuex'
// // import { initialiseStores } from '~/utils/store-accessor'

// // const initializer = (store: Store<any>) => initialiseStores(store)

// // export const plugins = [initializer]
// // export * from '~/utils/store-accessor'


// import Axios from "axios";
// import https from 'https'



// const agent = new https.Agent({  
//     rejectUnauthorized: false
//   })


// const initState = () => ({
//     message: "init"
// })

// export const state = initState

// export const mutations = {
//     setMessage(state, message) {
//         state.message = message
//     },
//     reset(state) {
//         Object.assign(state, initState())
//     }
// }

// export const actions = {
//     async nuxtServerInit({commit}){
//         const message = (await Axios.get("https://localhost:5001/api/bookings", { httpsAgent: agent })).data;
//         console.log(message);
//         commit("setMessage", message)
//     }
// }
