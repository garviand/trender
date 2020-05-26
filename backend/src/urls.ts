import {Application} from 'express'

import {UserRoutes} from './controllers/users/urls'

export function setUrls(app: Application) {

  function addUrls(urls: any, prefix: string) {
    urls.forEach((url: any) => {
      let functions = [url.controller];
      if (url.middleware) {
        functions.unshift(url.middleware)
      }
      if (url.type === 'post') {
        app.post(`/${prefix}/${url.path}`, functions)
      }
      if (url.type === 'get') {
        app.get(`/${prefix}/${url.path}`, functions)
      }
    });
  }

  // USERS
  addUrls(UserRoutes, 'users')

}