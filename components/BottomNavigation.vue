<template>
  <v-bottom-navigation color="primary" horizontal>
    <!-- <template v-slot:activator="{ on, attrs }"> -->
    <v-btn @click="dialog = true">
      <span>Create</span>
      <!-- <v-icon>event-plus</v-icon> -->
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn>
    <!-- </template> -->
    <!-- <v-btn>
      <span>Recents</span>

      <v-icon>mdi-history</v-icon>
    </v-btn> -->

    <v-btn>
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Nearby</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
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
  </v-bottom-navigation>
</template>

<script>
import CreateBooking from "~/components/CreateBooking.vue";

export default {
  components: {
    CreateBooking,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    closeDialog(arg) {
      this.dialog = arg;
    },
  },
};
</script>