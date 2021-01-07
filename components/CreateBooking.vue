<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field label="Booking id" v-model="id" :rules="idRules" required>
    </v-text-field>

    <v-text-field
      label="Worker id"
      v-model="WorkerId"
      :rules="workerIdRules"
      required
    >
    </v-text-field>

    <v-text-field
      label="Project name"
      v-model="projectName"
      required
    ></v-text-field>

    <v-text-field
      required
      disabled
      label="Start"
      v-model="startDate"
    ></v-text-field>
    
    <v-text-field
      required
      disabled
      label="Finished"
      v-model="finishDate"
    ></v-text-field>

    <v-date-picker v-model="startDate"></v-date-picker>
    <v-date-picker v-model="finishDate"></v-date-picker>

    <v-btn :disabled="!valid" class="mr-4" @click="validate">
      Create booking
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    valid: false,
    id: null,
    WorkerId: null,
    projectName: "",
    start: null,
    finish: null,
    date: null,
    startDate: new Date().toISOString().substr(0, 10),
    finishDate: new Date().toISOString().substr(0, 10),

    idRules: [
      (v) => !!v || "ID is required",
      (v) => /[0-9]/.test(v) || "ID can only be numbers",
    ],
    workerIdRules: [
      (v) => !!v || "Worker is required",
      (v) => /[0-9]/.test(v) || "worker Id can only be numbers",
    ],
  }),

  methods: {
    // ...mapMutations(["reset"]),
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
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>