<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <bottom-navigation/>
  </v-app>
</template>

<script>
import BottomNavigation from "~/components/BottomNavigation.vue";

export default {
    components: {
    BottomNavigation,
  },
};
</script>
