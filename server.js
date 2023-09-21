const express = require('express')
const app = express()
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


app.use(express.json())
const port = 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})