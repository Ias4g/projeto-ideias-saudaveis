import cors from 'cors'
import express from 'express'
import nunjucks from 'nunjucks'
import { routes } from './routes'

const server = express()

// Configurando arquivos estáticos como styles, scripts e images
server.use(express.static("./src/public"))
server.use(express.json())

//Habilitando o usode req.body
server.use(express.urlencoded({ extended: true }))

nunjucks.configure("./src/views", {
    express: server,
    noCache: true
})

server.use(cors())

server.use(routes)


server.listen(3000, () => {
    console.log('Server running on host http://localhost:3000')
})