const express = require("express")  // Importo la libreria express
const usersRoutes = require ("./users/index")
const cors = require("cors")


const server = express()

server.use( express.json()) // Parse the body when is in json format

server.use("/users", usersRoutes)

server.listen(3001, () => {
    console.log("Server is running on port 3001!")
}) // Avvia il server, server specificare la porta.


