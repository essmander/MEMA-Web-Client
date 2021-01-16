<template>
  <v-row justify="center" align="center">
    <v-banner width="100%">
      <template v-slot:actions>
        <v-btn @click="login" color="primary">Login</v-btn>
        <v-btn @click="logout" color="primary">Logout</v-btn>
        <v-btn @click="api('test')">Test</v-btn>
        <v-btn @click="api('testmod')">TestMOD</v-btn>
        <p>{{ testLabel }}</p>
        <v-select v-model="select" :items="items"></v-select>
        <v-btn class="mx-2" fab dark color="indigo" @click="dialog = true" v-if="authenticated">
          <v-icon color="black">mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-banner>

    <v-col cols="12" sm="8" md="6">
      <v-list three-line subheader v-if="bookings">
        <v-list-item v-for="b in bookings">
          <v-list-item-content v-if="bookings">
            <v-list-item-title>{{ b.projektName }}, {{ b.customer }}</v-list-item-title>
            <v-list-item-subtitle>
              <p>Start: {{ b.start }}</p>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <p>Finish: {{ b.finish }}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="dialog = false">
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

export default {
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
    ...mapGetters('auth', ['authenticated']),
  },
  data: () => ({
    dialog: false,
    items: ["Today", "This week", "This month"],
    select: "Today",
  }),
  methods: {
    ...mapMutations(["reset"]),
    ...mapActions(["getTest"]),
    closeDialog(arg) {
      this.dialog = arg;
    },
    login() {
      return this.$auth.signinRedirect();
    },
    logout() {
      return this.$auth.signoutRedirect();
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
