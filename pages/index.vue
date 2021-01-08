<template>
  <v-row justify="center" align="center">
    <v-banner width="100%">
      <template v-slot:actions>
        <!-- <v-btn text color="primary">Create</v-btn> -->
        <v-btn class="mx-2" fab dark color="indigo" @click="dialog = true">
          <v-icon color="black">mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-banner>

    <v-col cols="12" sm="8" md="6">
      <v-list three-line subheader v-if="bookings">
        <v-list-item v-for="b in bookings">
          <v-list-item-content>
            <v-list-item-title>{{ b.projectName }}</v-list-item-title>
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
import { mapState, mapActions, mapMutations } from "vuex";
import { schemaStore, dataStore } from "~/store";
import CreateBooking from "~/components/CreateBooking.vue";

export default {
  components: {
    CreateBooking,
  },
  computed: {
    ...mapState({
      bookings: (state) => state.bookings,
    }),
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapMutations(["reset"]),
    closeDialog(arg) {
      this.dialog = arg;
    },
  },
};
</script>
