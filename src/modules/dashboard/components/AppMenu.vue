<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          :exact="item.exact"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title> {{ item.title}} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true },
        { title: 'Receita', icon: 'add', url: '/dashboard/records/add?type=credit', exact: true },
        { title: 'Despesa', icon: 'remove', url: '/dashboard/records/add?type=debit', exact: true },
        { title: 'Relatórios', icon: 'assessment', url: '/dashboard/reports', exact: true }
      ]
    };
  }
};
</script>
