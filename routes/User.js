const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const router = express.Router()
const { supabase } = require('../supabaseConfig')

router.use(express.json())


//COnfigure Google OAuth strategy using passport
passport.use(
    new GoogleStrategy(
        {
            clientID: '',
            clientSecret: '',
            callbackURL: '',
        },
        async (accessToken, refreshToken, profile, done) => {
             // Use the profile data to sign up or sign in the user in Supabase
            try {
                const { email } = profile._json
                const { user, error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                })
                if (error) throw error
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

// Initialize Passport session
router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


//Create a new user
router.post('/signup', async(req, res) => {
    try{
        const { email, password } = req.body
        const { user, error } = await supabase.auth.signUp({
            email, password
        })
        if (error) throw error
        res.json({ user })
    } catch(error){
        res.status(400).json({ error: error.message})
    }
})
// Google sign-in routes
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
  
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/success', // Redirect URL after successful sign-in
      failureRedirect: '/error', // Redirect URL after failed sign-in
    })
)
/*
I can add a custom html tempalate for the sent email for different uses
check out the following link: https://www.youtube.com/watch?v=mDcmmh80s9E&ab_channel=CodewithGuillaume
also find a custom smtp provider eg. sendgrid
*/

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

module.exports = router