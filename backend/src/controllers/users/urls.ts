import * as api from './api'
import * as views from './views'

export const UserRoutes = [
  {
    type: 'get',
    path: '',
    middleware: undefined,
    controller: views.getAllUsers
  },
  {
    type: 'post',
    path: 'register/',
    middleware: undefined,
    controller: api.register
  },
  {
    type: 'post',
    path: 'login/',
    middleware: undefined,
    controller: api.login
  }
];