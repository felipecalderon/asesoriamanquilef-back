import { config } from 'dotenv'
config()

export const port = process.env.PORT || 3001
export const auth_secret = process.env.AUTH0_SCRT as string
export const auth_baseurl = process.env.AUTH0_BASEURL as string
export const auth_clientid = process.env.AUTH0_CLIENTID as string
export const auth_issuer = process.env.AUTH0_ISSUER as string
