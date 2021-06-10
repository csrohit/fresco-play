const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('server/db.json')

const userdb = JSON.parse(fs.readFileSync('server/users.json', 'UTF-8'))

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

function isAuthenticated({ username, password }) {

    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function getUserDetails(username) {
    return userdb.users.find(user => user.username === username);
}

server.post('/auth/server', (req, res) => {
    const { username, password } = req.body
    if (isAuthenticated({ username, password }) === false) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({ status, message })
        return
    }
    const userDetails = getUserDetails(username);
    res.status(200).json({ userId: userDetails.id })
})
server.use(router)

server.listen(8001, () => {
    console.log('Server connected on 8001')
})

