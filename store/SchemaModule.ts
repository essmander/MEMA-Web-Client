// import  Axios  from "axios";

// const initState = () => ({
//     message: ""
// });

// export const state = initState

// export const mutations = {
//     setMessage(state : any, message : string ){
//         state.massage = message
//     }
// }

// export const actions = {
//    async fetchMessage({commit : any}){
//        const message = (await Axios.get("https://localhost:5001/api/bookings")).data;

//        commit("setMessage", message);
//    }
// }
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
//import Axios from "axios";

@Module({
    name: 'SchemaModule',
    stateFactory: true,
    namespaced: true,
  })
 export default class SchemaModule extends VuexModule {

    initState = () => ({
        message: "init"
    })

    @Mutation
    setMessage(state: any, message: any) {
        state.massage = message
    }

    @Mutation
    reset(state: any){
        Object.assign(state, this.initState())
    }

   // @Mutation
    // async fetchMessage() 
    // {
    //     console.log('apa');
    // }

    @Action({ rawError: true })
    async fetchMessage() {
        console.log("apa");
        const message = (await $axios.$get("http://localhost:5000/api/bookings")).data;
        console.log(message);
        //this.setMessage("setMessage", message);
        this.context.commit("setMessage", message);
    }
}
