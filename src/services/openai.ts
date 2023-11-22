import openAI from "openai";

console.log(process.env.GPTKey);
export const openai = new openAI({
    apiKey: process.env.GPTKey
})