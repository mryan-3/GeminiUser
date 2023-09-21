const express = require('express')
const router = express.Router()
const supabase = require('../supabaseConfig')

router.use(express.json())

//Create a new user
router.post('/signup', async(req, res) => {
    try{
        const { email, body } = req.body
        const { user, error } = await supabase.auth.signUp({
            email, password
        })
        if (error) throw error
        res.json({ user })
    } catch{
        res.status(400).json({ error: error.message})
    }
})

//Login a user
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body
        const { user, error } = await supabase.auth.signInWithPassword({
            email, password
        })
        if (error) throw error
        res.json({ user })
    }catch{
        res.status(400).json({ error: error.message})
    }
})

