import openAI from 'openai'
import { config } from 'dotenv'
config()

const apiKey = process.env.GPTKey
export const openai = new openAI({ apiKey })
