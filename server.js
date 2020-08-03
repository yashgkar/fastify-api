// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const PORT = 5000 || process.env.PORT

// Run the server!
fastify.listen(5000, (err, address)=>{
  if (err){
    console.log(err)
    process.exit(1)
  } else {
    console.log(`Server running on port ${PORT}`)
  }
})