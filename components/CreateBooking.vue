<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="Project name"
      v-model="projectName"
      :rules="projectNameRules"
      required
    ></v-text-field>

    <v-text-field
      label="Customer"
      v-model="customer"
      :rules="customerRules"
      required
    ></v-text-field>

    <v-text-field
      @click="openDateFromDialog"
      required
      label="Start"
      v-model="startDate"
    ></v-text-field>

    <v-btn width="100%" :disabled="!valid" @click="saveBooking">
      Create booking
    </v-btn>

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
            <v-date-picker v-model="startDate"></v-date-picker>
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
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    valid: false,
    dateFromDialog: false,
    projectName: "",
    customer: "",
    start: null,
    date: null,
    startDate: new Date().toISOString().substr(0, 10),
    // finishDate: new Date().toISOString().substr(0, 10),

    // idRules: [
    //   (v) => !!v || "ID is required",
    //   (v) => /([0-9])/.test(v) || "ID can only be numbers",
    // ],
    // workerIdRules: [
    //   (v) => !!v || "Worker is required",
    //   (v) => /([0-9])/.test(v) || "worker Id can only be numbers",
    // ],
    projectNameRules: [(v) => !!v || "Project name is required"],
    customerRules: [(v) => !!v || "Project name is required"],
  }),

  methods: {
    // ...mapMutations(["reset"]),
    ...mapActions("schema", ["createBooking"]),
    async saveBooking() {
      if (this.validate()) {
        await this.createBooking({
          booking: {
            projectName: this.projectName,
            customer: this.customer,
            start: this.startDate,
            //finished: "2021-06-03T00:00:00"
          },
        });

        this.close();
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    close() {
      this.reset();
      this.$emit("openDialog", false);
    },
    openDateFromDialog() {
      this.dateFromDialog = true;
    },
  },
};
</script>