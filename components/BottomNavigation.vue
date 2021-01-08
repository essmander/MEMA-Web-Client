<template>
  <v-bottom-navigation
    color="primary"
    horizontal
    fixed
  >
    <v-btn @click="dialog = true">
      <span>Create</span>
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn>

    <v-btn>
      <span>Journal</span>

      <v-icon>mdi-car</v-icon>
    </v-btn>

    <v-btn>
      <span>Team</span>

      <v-icon>mdi-account-group </v-icon>
    </v-btn>

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