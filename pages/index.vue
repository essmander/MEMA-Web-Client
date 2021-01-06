<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="bookings">
        <p v-for="b in bookings">
          {{ b.projectName }}
        </p>
      </div>

      <div>
        <v-text-field label="Booking id" v-model="id"></v-text-field>
        <v-text-field label="Worker id" v-model="WorkerId"></v-text-field>
        <v-text-field label="Project name" v-model="projectName"></v-text-field>
        <v-text-field disabled label="Start" v-model="startDate"></v-text-field>
        <v-text-field
          disabled
          label="Finished"
          v-model="finishDate"
        ></v-text-field>

        <v-date-picker v-model="startDate"></v-date-picker>
        <v-date-picker v-model="finishDate"></v-date-picker>
      </div>

      <v-btn @click="saveBooking">Create</v-btn>

      <v-btn @click="reset">Reset</v-btn>
    </v-col>
  </v-row>
</template>

<script>

import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import { schemaStore, dataStore } from "~/store";

export default {
  components: {
   
  },
  data: () => ({
    id: null,
    WorkerId: null,
    projectName: "",
    start: null,
    finish: null,
    date: null,
    startDate: new Date().toISOString().substr(0, 10),
    finishDate: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    ...mapState({
      bookings: (state) => state.bookings,
    }),
  },
  methods: {
    ...mapMutations(["reset"]),
    ...mapActions(["createBooking"]),
    async saveBooking() {
      await this.createBooking({
        booking: {
          id: this.id,
          WorkerId: this.WorkerId,
          projectName: this.projectName,
          start: this.start,
          finish: this.finish,
        },
      });
      this.id = null;
      this.WorkerId = null;
      this.projectName = "";
      this.start = null;
      this.finish = null;
    },
  },
};
</script>
