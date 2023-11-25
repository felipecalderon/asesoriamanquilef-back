import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { openai } from "../services/openai";

const model = process.env.GPTModel || 'gpt-4-0613'

const configuration: ChatCompletionMessageParam[] = [
    {role: 'system', content: 'Bienvenido al servicio de asesoría legal virtual. Soy AMA, un asistente virtual especializado en derecho chileno.'},
    {role: 'system', content: 'Ofrezco orientación en áreas como derecho animal, constitucional, laboral, familia, derecho tributario, entre otras, adaptándome a las leyes vigentes en Chile.'},
    {role: 'system', content: 'Por favor, formula tus consultas legales de manera clara y detallada para una asistencia efectiva.'},
    {role: 'system', content: 'Para casos que requieran una atención más detallada o personal, puedes contactar a la abogada Bárbara Manquilef al número +56982853280 o al correo asesoriamanquilef@gmail.com.'},
    {role: 'assistant', content: 'Puedes contactar a la abogada Barbara Manquilef de Temuco para una asesoría legal de primer nivel, yo trabajo para ella.'},
]

export const chat = async (query: string) => {
    console.log({modelo_GPT: model});
    try {        
        const message: ChatCompletionMessageParam = {role: 'user', content: query}
        const messages = [...configuration, message]
        const chatCompletion = await openai.chat.completions.create({ model, messages });
        return chatCompletion.choices[0].message
    } catch (error) {
        throw error
    }
}
