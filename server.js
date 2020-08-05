const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'))
const PORT = 5000 || process.env.PORT

const stack = []
//@Routes
fastify.get('/', (request, reply) => {
  reply.send(stack)
})

fastify.post('/addValue', (request, reply) => {
  value = request.body.value
  stack.push(value)
  reply.send(stack)
})

fastify.put('/getLocation', (request, reply) => {
  findValue = request.body.value
  //check if value exists
  if (stack.indexOf(findValue) === -1) {
    reply.send('Err: No such element found! Please check values')
  } else {
    reply.send(stack.indexOf(findValue))
  }
})

fastify.delete('/popElement', (request, reply) => {
  stack.pop()
  reply.send(stack)
})

//@Server!
fastify.listen(5000, (err) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    console.log(`Server running, navigate to  https://localhost:${PORT}`)
  }
})