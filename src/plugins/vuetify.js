import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.teal.darken1,
        accent: colors.indigo.darken1,
        info: colors.blue,
        error: colors.pink.darken2,
        success: colors.teal.lighten1,
        warning: colors.purple.darken1
      }
    }
  }
});
