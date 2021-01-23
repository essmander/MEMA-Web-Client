<template>
  <v-form ref="form">
    <v-text-field
      label="Project name"
      :value="booking.projectName"
      required
    ></v-text-field>

    <v-text-field
      label="Customer"
      :value="booking.customer"
      required
    ></v-text-field>

    <v-text-field
      @click="openDateFromDialog"
      label="Start"
      :value="booking.start"
    ></v-text-field>

    <v-btn width="100%" @click="saveBooking"> Save booking </v-btn>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dateFromDialog"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title> Select start date</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-date-picker v-model="booking.start"></v-date-picker>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-form>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { schemaStore, dataStore } from "~/store";
export default {
  computed: {
    ...mapState("schema", {
      bookings: (state) => state.bookings,
    }),
  },

  //      data: () => ({
  //     valid: false,
  //     dateFromDialog: false,
  //     projectName: "",
  //     customer: "",
  //     start: null,
  //     date: null,
  //     startDate: new Date().toISOString().substr(0, 10),
  //     // finishDate: new Date().toISOString().substr(0, 10),

  //     // idRules: [
  //     //   (v) => !!v || "ID is required",
  //     //   (v) => /([0-9])/.test(v) || "ID can only be numbers",
  //     // ],
  //     // workerIdRules: [
  //     //   (v) => !!v || "Worker is required",
  //     //   (v) => /([0-9])/.test(v) || "worker Id can only be numbers",
  //     // ],
  //     projectNameRules: [(v) => !!v || "Project name is required"],
  //     customerRules: [(v) => !!v || "Project name is required"],
  //   }),

  data: () => ({
    booking: "",
    dateFromDialog: false,
    // projectName: booking.projectName,
    // customer: booking.customer,
    // start: bookings.start,
    // date: null,
    startDate: new Date().toISOString().substr(0, 10),
  }),
  created() {
    this.booking = this.bookings.find(
      (x) => x.bookingId == this.$route.params.bookingId
    );
    this.booking.start = new Date(this.booking.start).toISOString().substr(0, 10);
  },
  methods: {
    ...mapActions("schema", ["updateBooking"]),
    openDateFromDialog() {
      this.dateFromDialog = true;
    },
    async saveBooking() {
        await this.updateBooking({
          booking: this.booking,
        });

    //   console.log(this.booking);
    },
  },
};
</script>