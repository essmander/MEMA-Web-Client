// import { Store } from 'vuex'
// import { initialiseStores } from '~/utils/store-accessor'

// const initializer = (store: Store<any>) => initialiseStores(store)

// export const plugins = [initializer]
// export * from '~/utils/store-accessor'


import Axios from "axios";
import { getDefaultSettings } from "http";
import https from 'https'



const agent = new https.Agent({
    rejectUnauthorized: false
})


const initState = () => ({
    bookings: "init"
})

export const state = initState

export const mutations = {
    setBookings(state, bookings) {
        state.bookings = bookings
    },
    reset(state) {
        Object.assign(state, initState())
    },

    setMessage(state, message) {
        state.message = message
    }
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const bookings = (await Axios.get("https://localhost:5001/api/bookings", { httpsAgent: agent })).data;
        commit("setBookings", bookings);
    },
    async fetchBookings({ commit }) {
        const bookings = (await Axios.get("https://localhost:5001/api/bookings", { httpsAgent: agent })).data;
        commit("setBookings", bookings);
    },
    async createBooking({ commit, dispatch }, { booking }) {
        await Axios.post("https://localhost:5001/api/bookings", booking, { httpsAgent: agent });
        await dispatch('fetchBookings');
    },
    async getTest({ commit }) {
        //window.console.log("APA TEST");
        const message = (await Axios.get("https://localhost:5001/api/bookings/test", { httpsAgent: agent })).data;
        commit("setMessage", message);
    }
}