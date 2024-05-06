import { Express } from 'express'
import { auth, ConfigParams } from 'express-openid-connect'
import {
  auth_baseurl,
  auth_clientid,
  auth_issuer,
  auth_secret,
} from '../envConfig'

const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: auth_secret,
  baseURL: auth_baseurl,
  clientID: auth_clientid,
  issuerBaseURL: auth_issuer,
}

export const auth0Middlewares = (app: Express) => {
  app.use(auth(config))
}
