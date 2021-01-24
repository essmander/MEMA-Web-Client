<template>
  <v-form ref="form">
    <v-text-field
      label="Project name"
      v-model="booking.projectName"
      required
    ></v-text-field>

    <v-text-field
      label="Customer"
      v-model="booking.customer"
      required
    ></v-text-field>

    <v-text-field
      @click="openDateFromDialog"
      label="Start"
      v-model="booking.start"
    ></v-text-field>

    <v-btn width="100%" @click="saveBooking"> Save booking </v-btn>
    <br>
    <br>
    <v-btn width="100%" @click="removeBooking"> Delete booking </v-btn>

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
  data: () => ({
    booking: "",
    dateFromDialog: false,
    startDate: new Date().toISOString().substr(0, 10),
  }),
  created() {
    this.booking = this.bookings.find(
      (x) => x.bookingId == this.$route.params.bookingId
    );
    this.booking.start = new Date(this.booking.start).toISOString().substr(0, 10);
  },
  methods: {
    ...mapActions("schema", ["updateBooking", "deleteBooking"]),
    openDateFromDialog() {
      this.dateFromDialog = true;
    },
    async saveBooking() {
        await this.updateBooking({
          booking: this.booking,
        }).then(r => {
            this.$router.push({ name: "index" });
        });
    },
    async removeBooking() {
        await this.deleteBooking(this.booking.bookingId).then(r => {
            this.$router.push({ name: "index" });
        });
    },  
  },
};
</script>