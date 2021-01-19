<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <bottom-navigation v-if="authenticated"/>
  </v-app>
</template>

<script>
import BottomNavigation from "~/components/BottomNavigation.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    BottomNavigation,
  },
  computed: {
    ...mapState("auth", ["loading"]),
    ...mapGetters("auth", ["authenticated"]),
  },
};
</script>
