const express = require('express')
const { dbConnection } = require('./db/config')
require('dotenv').config()
const cors = require('cors')

const app = express()

dbConnection()


app.use(cors())
//Directorio publico
app.use( express.static('public') )

app.use( express.json() )

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/projects', require('./routes/projects.routes'))
app.use('/api/tecnologias', require('./routes/tecnologia.routes'))


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor en puerto ${process.env.PORT}`);
})