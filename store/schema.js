import Axios from "axios";
import { getDefaultSettings } from "http";
import https from 'https'

const agent = new https.Agent({
    rejectUnauthorized: false
})


const initState = () => ({
    bookings: []
})

export const state = initState

export const mutations = {
    setBookings(state, { bookings }) {
        state.bookings = bookings
    },
    setBooking(state, { booking }) {
        state.booking = booking
    },
    reset(state) {
        Object.assign(state, initState())
    },

    setMessage(state, message) {
        state.message = message
    }
}

export const actions = {
    async fetchBookings({ commit }) {
        const bookings = (await this.$axios.get("https://localhost:5001/api/bookings", { httpsAgent: agent })).data;
        commit("setBookings", { bookings });
    },
    async createBooking({ dispatch }, { booking }) {
        await this.$axios.post("https://localhost:5001/api/bookings", booking, { httpsAgent: agent });
        await dispatch('fetchBookings');
    },
    async updateBooking({ dispatch }, { booking }) {
        await this.$axios.patch("https://localhost:5001/api/bookings", booking, { httpsAgent: agent });
        await dispatch('fetchBookings');
    },
    async getTest({ commit }) {
        //window.console.log("APA TEST");
        const message = (await Axios.get("https://localhost:5001/api/bookings/test", { httpsAgent: agent })).data;
        commit("setMessage", message);
    }
}