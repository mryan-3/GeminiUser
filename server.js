const express = require('express')
const app = express()
const userRoutes = require('./routes/User')

app.use(express.json())


app.use('/', userRoutes)
const port = 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})