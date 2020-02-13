const RecordsAdd = () => import('./../views/RecordsAdd');
const RecordsHome = () => import('./../views/RecordsHome');
const ReportsHome = () => import('./../views/ReportsHome');

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: {
      requiresAuth: true
    },
    alias: ['home', '']
  },
  {
    path: 'records/add',
    name: 'recordsAdd',
    meta: {
      requiresAuth: true
    },
    component: RecordsAdd
  },
  {
    path: 'reports',
    component: ReportsHome,
    meta: { requiresAuth: true }
  }
];
