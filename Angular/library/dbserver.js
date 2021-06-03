const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('server/db.json')

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(router)

server.listen(8001, () => {
    console.log('Run Auth API Server')
})

