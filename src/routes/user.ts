import { Router, Request, Response } from "express"
import jwt from 'jsonwebtoken'

import isAuth from "../middlewares/isAuth"

import User from "../models/user"

const router = Router()

router.post('/register', async (req: Request, res:Response) => {
    try {
        const username = req.body.username

        const checkForUser = await User.findOne({
            username: username
        })

        if (checkForUser) {
            const e = {
                msg: 'User with user name already exists!',
                statusCode: 404
            }
            throw e
        }

        const newUser = new User(req.body)

        const user = await newUser.save()

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET!, { expiresIn: '7d' })

        res.status(200).json({
            user: user,
            token: token
        })
    } catch(e: any) {
        console.log(e)
        res.status(e.statusCode).json({
            msg: e.msg
        })
    }
})

router.post('/login', async (req: Request, res:Response) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const user = await User.findOne({
            username: username
        })

        if (!user) {
            const e = {
                msg: 'User with user name does not exist!',
                statusCode: 404
            }
            throw e
        } else if (user.password !== password) {
            const e = {
                msg: 'Incorrect password!',
                statusCode: 404
            }
            throw e
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET!, { expiresIn: '7d' })

        res.status(200).json({
            user: user,
            token: token
        })
    } catch(e: any) {
        console.log(e)
        res.status(e.statusCode).json({
            msg: e.msg
        })
    }
})

router.get('/search', isAuth, async (req: Request, res:Response) => {
    try {
        const searchString = req.body.search

        if (!searchString) {
            const e = {
                msg: 'Invalid query!',
                statusCode: 404
            }
            throw e
        }

        const searchRegex = new RegExp(searchString, "i")
        const users = await User.find({
            $or: [{ username: searchRegex }]
        })

        res.status(200).json({
            users: users
        })
    } catch(e: any) {
        console.log(e)
        res.status(e.statusCode).json({
            msg: e.msg
        })
    }
})

export default router