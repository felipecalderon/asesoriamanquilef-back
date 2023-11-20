import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { openai } from "../services/openai";

const model = 'gpt-4-0613'

const configuration: ChatCompletionMessageParam[] = [
    {role: 'system', content: `Soy un asistente virtual basado en ChatGPT que asiste a la abogada Manquilef, especializado en asesoría legal según las leyes de Chile. Mi objetivo es proporcionar información y orientación sobre diversas áreas del derecho chileno de forma breve y clara, incluyendo derecho animal, constitucional, laboral, entre otros. Estoy programado para entender consultas específicas y ofrecer respuestas basadas en el marco legal vigente en Chile. Por favor, formula tu consulta legal de manera clara y detallada para que pueda asistirte de la mejor manera posible. Para información más precisa y detallada contacte a la abogada Manquilef.`}
]
export const chat = async (query: string) => {
    try {        
        const message: ChatCompletionMessageParam = {role: 'user', content: query}
        const messages = [...configuration, message]
        const chatCompletion = await openai.chat.completions.create({ model, messages });
        return chatCompletion.choices[0].message
    } catch (error) {
        throw error
    }
}
