const express = require('express')
const router = express.Router()
const supabase = require('../supabaseConfig')

router.use(express.json())

//Create a new user
router.post('/signup', async(req, res) => {
    try{
        const { email, password } = req.body
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
    }catch (error){
        res.status(400).json({ error: error.message})
    }
})

// Reset password
router.post('/reset-password', async(req, res) => {
    try{
        const { email } = req.body
        const { error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) throw error
        res.json({message: "Password reset link sent successfully"})
    }catch(error){
        res.status(400).json({ error: error.message})
    }
})

// Update 
router.post('/update-user', async(req, res) => {
    try{
        const { password } = req.body
        const { user, error } = await supabase.auth.updateUser({
            password
        })
        if(error) throw error
        res.json({ message: "Updated password and email"})
    }catch(error){ 
        res.status(400).json({ error: error.message})
    }
})

// Logout
router.post('/logout', async(req, res) => {
    try{
        const { error } = await supabase.auth.signOut()
    }catch(error){
        res.status(400).json({ error: error.message})
    } 
})