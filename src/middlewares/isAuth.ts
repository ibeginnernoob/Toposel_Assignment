import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) {
            throw new Error('Invalid token!')
        }
        const token = req.headers['authorization'] as string

        const { userId } = <jwt.UserIDJwtPayload> jwt.verify(token, process.env.JWT_SECRET!)

        req.userId = userId

        next()
    } catch(e: any) {
        console.log(e)
        res.status(404).json({
            msg: 'User not authenticated!'
        })
    }
}

export default isAuth