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
import https from 'https'
import { Booking } from '~/types/Booking'
//import Axios from "axios";


const agent = new https.Agent({  
    rejectUnauthorized: false
  })


@Module({
    name: 'SchemaModule',
    stateFactory: true,
    namespaced: true,
  })
 export default class SchemaModule extends VuexModule {

    

    initState = () => ({
        message: "init"
    })

    bookings: Booking[] = [];


    @Mutation
    setBookings(bookings : Booking[]) {
       this.bookings = bookings;
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
        // await $axios.$get("https://localhost:5001/api/bookings", { httpsAgent: agent }).then((res) => {
        //     console.log(res);
        //     this.context.commit("setMessage", res);
        // });

        const bookings = await $axios.$get("https://localhost:5001/api/bookings", { httpsAgent: agent }) as Booking[];
        console.log(bookings)
        this.setBookings(bookings);
        // console.log(message);
        // //this.setMessage("setMessage", message);
        // this.context.commit("setMessage", message);
    }
}
