import dotenv from 'dotenv'
import openAI from "openai";
dotenv.config()

console.log(process.env.GPTKey);
export const openai = new openAI({
    apiKey: process.env.GPTKey
})