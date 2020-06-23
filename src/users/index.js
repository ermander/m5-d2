/* What we would like to achieve 

1. Get all user's data on url localhost:3001/users/ - GET
2. Get single user's data on localhost:3001/users/:id/ - GET
3. Create single user record on url localhost:3001/users/ - POST 
4. Modify single user's data on url localhost:3001/users/:id/ - PUT
5. Delete single user's data on url localhost:3001/users/:id/ - DELETE

*/

const express = require("express") // Importare in ogni file, third party module
const fs = require("fs") // Core module dedicated to file system interactions
const path = require("path") // Core module
const uniqid = require ("uniqid")

const router = express.Router()

// 1.
router.get("/", (request, response) => {  
    // (request, response) => is the handler for the specific route 
    
    // a) retrieve users list from afile on disk
    const usersFilePath = path.join(__dirname, "users.json") 
    const fileContentAsABuffer = fs.readFileSync(usersFilePath) // Cerca la path corrente e la concatena al file scelto
    const fileContent = fileContentAsABuffer.toString()

    // b) send the list as a json in the response
    response.send(JSON.parse(fileContent)) // Parse string content to JSON format
} ) 

// 2.
router.get("/:id", (request, response) => { // retrieve single user from a file on disk
    

    // a. read the file on disk and get back an array of users
    const usersFilePath = path.join(__dirname, "users.json") 
    const fileContentAsABuffer = fs.readFileSync(usersFilePath)
    const usersArray = JSON.parse(fileContentAsABuffer.toString())
    console.log(usersArray)    
    
    // b. filter out the array to retrieve the specified user (we're gonna be using the id)
    const user = usersArray.filter(
        (user) => user.id === request.params.id
    )
    console.log(user)

    // c. send the user back into the response
    response.send(user)
} )

// 3.
router.post("/", (request, response) => {
    console.log(request.body)
    const newUser = {...request.body, id: uniqid()}

    // 1. Read the content of the file and get back an array of users
    const usersFilePath = path.join(__dirname, "users.json") 
    const fileContentAsABuffer = fs.readFileSync(usersFilePath)
    const usersArray = JSON.parse(fileContentAsABuffer.toString())
    // 2. Adding the new user to the array

    usersArray.push(newUser)
    console.log(usersArray)

    // 3. Writting new content into the same file

    fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))
    // 4. Responde with status 201 === "created"
    response.send(request.body)
    response.status(201).send(user)

} )

// 4.
router.put("/:id", (request, response) => {

    // 1. Read the content of the file and get back an array of users

    const usersFilePath = path.join(__dirname, "users.json") 
    const fileContentAsABuffer = fs.readFileSync(usersFilePath)
    const usersArray = JSON.parse(fileContentAsABuffer.toString())

    // 2. Filter users by excluding the one with specified id 

    const filteredUsersArray = usersArray.filter(
        (user) => user.id !== request.params.id
    )

    // 3. Adding back the user with the modified body

    const user = request.body // request.body hodling the new data for the spcified user
    user.id = request.params.id
    filteredUsersArray.push(user)

    // 4. Write it back to the same file

    fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))
    

    // 5. Respond back with ok

    response.send("OK")

} )

// 5.

router.delete("/:id", (request, response) => {
    // 1. Read the content of the file and get back an array of users

    const usersFilePath = path.join(__dirname, "users.json") 
    const fileContentAsABuffer = fs.readFileSync(usersFilePath)
    const usersArray = JSON.parse(fileContentAsABuffer.toString())

    // 2. Filter users by excluding the one with specified id

    const filteredUsersArray = usersArray.filter(
        (user) => user.id !== request.params.id
    )
    // 3. Write the filtered content back into the same file

    fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))
    // 4. Responde with ok

    response.send("OK")
} )


module.exports = router