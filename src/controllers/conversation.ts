import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions.mjs";
import { openai } from "../services/openai";
import { usuarioNecesitaDocumento } from "../utils/tools";
import { generarDocumento } from "./generateDocGPT";
import { Socket } from "socket.io";

const model = process.env.GPTModel || 'gpt-4-0613'

const configuration: ChatCompletionMessageParam[] = [
    {role: 'system', content: 'Soy un abogado virtual. Especializado en derecho chileno.'},
    {role: 'system', content: 'Doy orientación en áreas como derecho animal, constitucional, laboral, familia, derecho tributario, entre otras, adaptándome a las leyes vigentes en Chile.'},
    {role: 'system', content: 'Seré claro y muy breve con mis respuestas, comprendiendo que el usuario no maneja ni entiende a la perfección términos legales'},
    {role: 'system', content: 'Barbara Manquilef es Licenciada en Ciencias Jurídicas, egresada de la Universidad Católica de Temuco, con diplomaturas en Derecho Animal de la Universidad de Concepción, posee además el curso de actualización de Gestión Municipal y Aplicación de la Ley N°21.020 sobre Tenencia Responsable.'},
    {role: 'assistant', content: 'Para casos que requieran una atención más detallada o personal, debes contactar a la abogada Bárbara Manquilef presionando el botón de Whatsapp en el sitio web'},
]

export const chat = async (query: string, socket?: Socket) => {
    console.log({modelo_GPT: model});
    
    // const tools = [ usuarioNecesitaDocumento ]
    const tools: ChatCompletionTool[]= []
    try {
        const message: ChatCompletionMessageParam = {role: 'user', content: query}
        const messages = [...configuration, message]
        const chatCompletion = await openai.chat.completions.create(
            { 
                model, 
                messages,
            });
        const funciones = chatCompletion.choices[0].message?.tool_calls

        if(funciones){
            const funcionLlamada = funciones[0].function
            switch(funcionLlamada.name){
                case 'generarDocumento': {
                    if(socket) return generarDocumento(query, socket)
                    return generarDocumento(query)
                }
            }
        }

        return chatCompletion.choices[0].message
    } catch (error) {
        console.log({error});
        throw error
    }
}
