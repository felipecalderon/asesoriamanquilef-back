import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { openai } from "../services/openai";
import { generarPDF } from "../utils/toPDF";
import { subirPDFaFirebase } from "../utils/setFileFB";
import { storage } from "../services/firebase";
import { Socket } from "socket.io";

const model = process.env.GPTModel || 'gpt-4-0613'
interface PDFcontent {
    titulo: string
    detalle: string
}
export const generarDocumento = async (query: string, socket?: Socket) => {
    const instruccion: ChatCompletionMessageParam = {
        role: 'system', 
        content: 'Muestra un ejemplo de un documento legal y profesional, responde en formato JSON con las propiedades: titulo (string: nombre del documento) y detalle (string: contenido que debe tener dicho documento)'}
    const userMessage: ChatCompletionMessageParam = {
        role: "assistant",
        content: query
    }
    const res = (respuesta: string) => {
        return {
            "role": "assistant",
            "content": respuesta
        }

    }
    socket?.emit('chat_response', res('Puedo prepararte el documento que necesitas, por favor paciencia'));
    const chatCompletion = await openai.chat.completions.create({ 
            model, 
            response_format: {type: 'json_object'},
            messages: [instruccion, userMessage]
        });
    
    const { content } = chatCompletion.choices[0].message
    if(!content) return null
    const contenidoJSON: PDFcontent = JSON.parse(content)
    socket?.emit('chat_response', res('Aquí va el documento...'));
    const pdfGenerado = await generarPDF(contenidoJSON)
    const nombreArchivo = contenidoJSON.titulo.replace(' ', '-').toLowerCase() + '.pdf'
    return await subirPDFaFirebase(pdfGenerado, nombreArchivo, storage)
}