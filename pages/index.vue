<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="bookings">
        <p v-for="b in bookings">
          {{ b.projectName }}
        </p>
      </div>

      <v-btn @click="reset">Reset</v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Create Booking
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New booking</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- <v-btn dark text @click="saveBooking"> Create </v-btn> -->
            </v-toolbar-items>
          </v-toolbar>

          <v-divider></v-divider>
          <create-booking v-on:openDialog="closeDialog" />
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import { schemaStore, dataStore } from "~/store";

import CreateBooking from "~/components/CreateBooking.vue";

export default {
  components: {
    CreateBooking,
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

    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    openDialog: false,
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
      dialog = false;
    },
    closeDialog(arg) {
      this.dialog = arg;
    },
  },
};
</script>
