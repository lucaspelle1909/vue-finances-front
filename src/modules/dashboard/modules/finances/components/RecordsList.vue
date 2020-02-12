<template>
  <div>

    <TotalBalance class="mb-2" />

    <ToolbarByMonth
      class="mb-2"
      format="MM-YYYY"
      @monthChange="changeMonth"
      :color="toolbarColor"
      :month="$route.query.month"
      :showSlot="true"
    >
      <RecordsFilter @filter="filter" />
    </ToolbarByMonth>
    <v-card>

      <v-card-text
        class="text-center"
        v-if="mappedRecordsLength === 0"
      >
        <v-icon
          size="100"
          color="grey"
        >assignment</v-icon>
        <p class="font-weight-light subheading grey--text">
          Nnehum lançamento no período
        </p>
      </v-card-text>

      <v-list
        two-line
        subheader
        v-else
      >
        <template v-for="(records, date, index) in mappedRecords">
          <div :key="date">
            <v-subheader>{{ date }}</v-subheader>
            <RecordsListItem
              v-for="record in records"
              :key="record.id"
              :record="record"
            />
            <v-divider v-if="showDivider(index, mappedRecords)"></v-divider>
          </div>
        </template>
      </v-list>
      <v-footer class="pa-2">
        <v-flex
          xs12
          class="text-right"
        >
          <h3 class="font-weight-light">
            <span>Saldo do mês:</span>
            <strong
              class="ml-5"
              :class="amountColor(totalAmount)"
            >{{ formatCurrency(totalAmount) }}</strong>
          </h3>
        </v-flex>
      </v-footer>
    </v-card>
  </div>
</template>

<script>

import moment from 'moment';
import { groupBy } from '@/utils';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { createNamespacedHelpers } from 'vuex';
import amountColorMixin from './../mixins/amount-color';
import formatCurrencyMixin from '@/mixins/format-currency';
import RecordsFilter from './RecordsFilter';
import RecordsListItem from './RecordsListItem';
import RecordsService from './../services/records-service';
import ToolbarByMonth from './ToolbarByMonth';
import TotalBalance from './TotalBalance';

const { mapState, mapActions } = createNamespacedHelpers('finances');

export default {
  name: 'RecordsList',
  components: {
    RecordsFilter,
    RecordsListItem,
    ToolbarByMonth,
    TotalBalance
  },
  mixins: [
    amountColorMixin,
    formatCurrencyMixin
  ],
  data: () => ({
    records: [],
    monthSubject$: new Subject(),
    subscriptions: []
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey].substr(0, 10)).format('DD/MM/YYYY');
      });
    },
    mappedRecordsLength () {
      return Object.keys(this.mappedRecords).length;
    },
    totalAmount () {
      return this.records ? this.records.reduce((sum, record) => sum + record.amount, 0) : 0;
    },
    toolbarColor () {
      return this.totalAmount < 0 ? 'error' : 'primary';
    }
  },
  created () {
    this.setRecords();
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe());
  },
  methods: {
    changeMonth (month) {
      this.$router.push({
        path: this.$route.path,
        query: { month }
      }).catch(err => console.log(err));

      this.monthSubject$.next({ month });
    },
    setRecords (month) {
      this.subscriptions.push(
        this.monthSubject$.pipe(
          mergeMap(variables => RecordsService.records(variables))
        ).subscribe(records => (this.records = records))
      );
    },
    showDivider (index, object) {
      return index < Object.keys(object).length - 1;
    }
  }
};
</script>
