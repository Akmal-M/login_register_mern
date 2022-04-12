const Users = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const userControl = {
    register: async (req, res) => {
        try{
            const {fullName, userName, email, password, gender} = req.body
            const user = await Users.findOne({email})
            if (user) return res.status(400).json({msg:'This email already exist'})
            if (password.length < 6) return res.status(400).json({msg:'Password must be at least 6 characters long'})

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await Users({fullName, userName, email, password: hashPassword, gender})
            await newUser.save()

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refresh_token',refresh_token, { path:'/api/rf_token',  httpOnly:true, maxAge: 30*24*60*60*1000  }) //30days

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    login: async (req, res) => {
        try{
            const {email, password} = req.body
            const user = await Users.findOne({email})
                .populate("followers following", "avatar userName fullName followers following")

           const isMatch =  await bcrypt.compare(password, user.password )
            if (!isMatch) return res.status(400).json({msg:'Incorrect password or email'})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refresh_token',refresh_token, { path:'/api/rf_token',  httpOnly:true, maxAge: 30*24*60*60*1000  }) //30days


        }catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    rf_token: async (req, res) => {
        try{

        }catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
}

const createAccessToken = payload => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1d'})
const createRefreshToken = payload => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '7d'})

module.exports = userControl