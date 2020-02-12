<template>
  <v-app-bar
    app
    fixed
    color="primary"
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
    <v-toolbar-title>{{title || 'Dashboard'}}</v-toolbar-title>

    <v-spacer />
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import AuthService from '@/modules/auth/services/auth-service';
import { mapState } from 'vuex';

export default {
  name: 'AppToolbar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  data: () => ({
    user: {}
  }),
  async created () {
    this.user = await AuthService.user();
  },
  computed: {
    ...mapState(['title'])
  }
};
</script>
