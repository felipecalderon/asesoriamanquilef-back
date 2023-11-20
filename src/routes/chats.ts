import {Request, Response, Router} from 'express'
import { chat } from '../controllers/conversation'

const chatRoute = Router()

chatRoute.post('/', async (req: Request, res: Response) => {
    try {        
        const { query } = req.body
        const ip = req.ip
        console.log({ip});
        if(!query) throw 'Debe ingresar una consulta'
        const respuestaIA = await chat(query)
        res.status(200).json(respuestaIA)
    } catch (error) {
        res.status(500).json({error})
    }
})

export {chatRoute}