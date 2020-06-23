/* What we would like to achieve 

1. Get all user's data on url localhost:3001/users/ - GET
2. Get single user's data on localhost:3001/users/:id/ - GET
3. Create single user record on url localhost:3001/users/ - POST 
4. Modify single user's data on url localhost:3001/users/:id/ - PUT
5. Delete single user's data on url localhost:3001/users/:id/ - DELETE

*/

const express = require("express") // Importare in ogni file

const router = express.Router()

// 1.
router.get("/", (request, response) => {} ) // (request, response) => is the handler for the specific route

// 2.
router.get("/:id", (request, response) => {} )

// 3.
router.post("/", (request, response) => {} )

// 4.
router.put("/:id", (request, response) => {} )

// 5.

router.delete("/:id", (request, response) => {} )


module.exports = router