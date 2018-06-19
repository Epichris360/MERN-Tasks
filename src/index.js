const express    = require('express')
const morgan     = require('morgan')
const app        = express()
const taskRoutes = require('./routes/task.routes')
const path       = require('path')
const mongoose   = require('./database')
// Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use( morgan('dev') )
app.use(express.json()) // handles json and also includes body-parser

// Static Files
app.use(express.static( path.join(__dirname, 'public') ))

// Routes
app.use('/api/tasks',taskRoutes)


//Serving 
app.listen( app.get('port') , () => {
    console.log(`Server on port: ${app.get('port')}`)
})