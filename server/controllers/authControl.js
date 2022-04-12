const Users = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const authControl = {

    register: async (req, res) => {
        try {
            const {fullName, userName, email, password, gender} = req.body
            const user = await Users.findOne({email})
            if (user) return res.status(400).json({msg: 'This email already exist'})
            if (password.length < 6) return res.status(400).json({msg: 'Password must be at least 6 characters long'})

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await Users({fullName, userName, email, password: hashPassword, gender})
            await newUser.save()

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                path: '/api/rf_token',
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 //30days
            })

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
                .populate("followers following", "avatar userName fullName followers following")

            if (!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: 'Incorrect password or email'})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refresh_token', refresh_token, {
                path: '/api/rf_token',
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 //30days
            })

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/rf_token'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: 'Please login first'})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({msg: "Please login now."})

                const user = await Users.findById(result.id).select("-password")
                    .populate('followers following', 'avatar username fullname followers following')

                if (!user) return res.status(400).json({msg: "This user does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken = payload => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1d'})
const createRefreshToken = payload => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '7d'})

module.exports = authControl