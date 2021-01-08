<template>
  <v-row justify="center" align="center">
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

      <!-- <div v-if="bookings">
        <p v-for="b in bookings">
          {{ b.projectName }}
        </p>
      </div> -->

      <v-btn @click="reset">Reset</v-btn>
    </v-col>
  </v-row>

</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import { schemaStore, dataStore } from "~/store";

export default {
  // components: {
  //   BottomNavigation,
  // },
  computed: {
    ...mapState({
      bookings: (state) => state.bookings,
    }),
  },
  methods: {
    ...mapMutations(["reset"]),
  },
};
</script>
