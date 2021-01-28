<template>
  <v-row justify="center" align="center" v-if="authenticated">
    <v-banner width="100%">
      <template v-slot:actions>
        <v-btn @click="login" color="primary">Login</v-btn>
        <v-btn @click="logout" color="primary">Logout</v-btn>
        <v-btn @click="api('test')">Test</v-btn>
        <v-btn @click="api('testmod')">TestMOD</v-btn>
        <p>{{ testLabel }}</p>
        <v-select v-model="select" :items="items"></v-select>
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="createBookingDialog = true"
          v-if="moderator"
        >
          <v-icon color="black">mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-banner>

    <v-col cols="12" sm="8" md="6">
      <v-list three-line subheader v-if="bookings">
        <v-list-item v-for="b in bookings">
          <v-list-item-content v-if="bookings">
            <div @click="updateBooking(b.bookingId)">
              <v-list-item-title
                >{{ b.bookingId }}, {{ b.projectName }},
                {{ b.customer }}</v-list-item-title
              >
              <v-list-item-subtitle>
                <p>Start: {{ b.start }}</p>
              </v-list-item-subtitle>
            </div>
          </v-list-item-content>
          <!-- <v-icon>mdi-trash-can-outline</v-icon> -->
          <v-icon>mdi-check-bold </v-icon>
          <!-- <v-icon>mdi-clipboard-edit-outline </v-icon> -->
        </v-list-item>
      </v-list>

      <v-dialog
        v-model="createBookingDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="createBookingDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New booking</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items> </v-toolbar-items>
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { schemaStore, dataStore } from "~/store";
import CreateBooking from "~/components/CreateBooking.vue";
import { UserManager, WebStorageStateStore } from "oidc-client";
import { guard, GUARD_LEVEL } from "~/components/auth/auth-mixins";

export default {
  mixins: [guard(GUARD_LEVEL.AUTH)],
  components: {
    CreateBooking,
  },
  computed: {
    ...mapState({
      testLabel: (state) => state.message,
    }),
    ...mapState("schema", {
      bookings: (state) => state.bookings,
    }),
    ...mapGetters("auth", ["authenticated", "moderator"]),
    // ...mapActions("schema", ["fetchBookings"]),
  },
  data: () => ({
    createBookingDialog: false,
    items: ["Today", "This week", "This month"],
    select: "Today",
  }),
  // async fetch() {
  //   // await this.$store.dispatch('schema/fetchBookings');
  //   await this.$store.dispatch('schema/fetchBookingsSpan');
  // },
  async mounted() {
    if (this.$store.getters["auth/authenticated"]) {
      console.log("LOGED in!");
      await this.$store.dispatch("schema/fetchBookingsSpan");
    }
  },
  methods: {
    ...mapMutations(["reset"]),
    closeDialog(arg) {
      this.createBookingDialog = arg;
    },
    login() {
      return this.$auth.signinRedirect();
    },
    logout() {
      return this.$auth.signoutRedirect();
    },
    updateBooking(id) {
      this.$router.push({ name: "updateBooking", params: { bookingId: id } });
    },
    api(x) {
      return this.$axios
        .$get("https://localhost:5001/api/bookings/" + x)
        .then((s) => {
          console.log(s);
        });
      // await this.getTest().then((x) => (this.testLabel = x));
    },
  },
};
</script>
