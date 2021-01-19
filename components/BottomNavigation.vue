<template>
  <v-bottom-navigation color="indigo" horizontal fixed>
     <!-- <v-btn
      @click="dialog = true"
      v-if="$route.fullPath != '/drivingJournal' && $route.fullPath != '/team'"
    >
      <span>Create</span>
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn> -->

  <v-btn to="/">
    <span>Calender</span>
    <v-icon>mdi-calendar</v-icon>
  </v-btn>

    <v-btn to="/drivingJournal">
      <span>Journal</span>

      <v-icon>mdi-car</v-icon>
    </v-btn>

    <v-btn to="/team">
      <span>Team</span>

      <v-icon>mdi-account-group </v-icon>
    </v-btn>
    
  </v-bottom-navigation>
</template>

<script>

export default {


};
</script>