const {Router} = require('express')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации'
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if(candidate) {
            return res.status(400).json({message:'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcript.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message:'Пользователь создан'})



    }catch(e) {
        res.status(500).json({messege: 'Чтото пошло не так...'})
    }
})

// /api/auth/login
router.post('/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
            async (req, res) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе в систему'
                    })
                }
                
                const {email, password} = req.body
                const user = await User.findOne({email})
                if(!user){
                    return res.status(400).json({message: 'Пользователь не найден'})
                }
                 const isMatch = await bcript.compare(password, user.password )
                 if (!isMatch) {
                     return res.status(500).json({ message: 'Неверный пароль найден' })
                 }



            } catch (e) {
                    res.status(500).json({ messege: 'Чтото пошло не так...' })
            }

    })
module.exports = router


