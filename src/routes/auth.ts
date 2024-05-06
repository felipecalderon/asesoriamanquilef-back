import { Request, Response, Router } from 'express'
const authRoute = Router()

authRoute.post('/login', async (req: Request, res: Response) => {
  try {
    // const loginUser = await authenticateUserEmailPassword(req.body)
    res.status(200).json('loginUser')
  } catch (error) {
    res.status(500).json({ error })
  }
})

authRoute.post('/register', async (req: Request, res: Response) => {
  try {
    // const newUser = await createUserEmailAndPassword(req.body)
    res.status(200).json('newUser')
  } catch (error) {
    res.status(500).json({ error })
  }
})
export { authRoute }
