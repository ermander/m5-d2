const express = require("express")  // Importo la libreria express

const usersRoutes = require ("./users/index")

const server = express()

server.listen(3001, () => {
    console.log("Server is running on port 3001!")
}) // Avvia il server, server specificare la porta.


