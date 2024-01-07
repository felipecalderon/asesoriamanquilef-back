import {Request, Response, Router} from 'express'
import { storage } from '../services/firebase'
import { generarPDF } from '../utils/toPDF';
import { subirPDFaFirebase } from '../utils/setFileFB';
const mediaRoute  = Router()

mediaRoute.get('/', async (req: Request, res: Response) => {
    try {       
        const pdf = await generarPDF({titulo: 'Holaa', detalle: 'Este es el detalle'})
        const subidaFB = await subirPDFaFirebase(pdf, 'pdfHola.pdf', storage)
        res.status(200).json(subidaFB)
    } catch (error) {
        res.status(500).json({error})
    }
})

export { mediaRoute }