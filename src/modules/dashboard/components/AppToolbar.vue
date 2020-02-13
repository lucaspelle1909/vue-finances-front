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
      @click="showLogoutDialog = true"
    >
      <v-icon>exit_to_app</v-icon>
    </v-btn>

    <v-dialog
      v-model="showLogoutDialog"
      max-width="250px"
    >
      <v-card>
        <v-card-title>
          <h3 class="subheading">Deseja realmente sair?</h3>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            small
            @click="showLogoutDialog = false"
          >
            Não
          </v-btn>
          <v-btn
            text
            small
            @click="logout"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import AuthService from '@/modules/auth/services/auth-service';
import { mapState } from 'vuex';
import apollo, { onLogout } from '@/plugins/apollo';

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
    user: {},
    showLogoutDialog: false
  }),
  async created () {
    this.user = await AuthService.user();
  },
  computed: {
    ...mapState(['title'])
  },
  methods: {
    async logout (e) {
      this.$router.push('/login');
      await onLogout(apollo);
    }
  }
};
</script>
