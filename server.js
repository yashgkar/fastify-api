const fastify = require('fastify')({ logger: true })
const PORT = 5000 || process.env.PORT
fastify.register(require('fastify-routes'))

const stack = []

//@Validation Schema
const postOptions = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: [
        'value'
      ],
      properties: {
        value: { type: 'string' }
      }
    }
  }
}

//@Serialization Schema
const serializeSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          stack: { type: 'array' }
        }
      }
    }
  }
}

//@Routes
fastify.get('/getStack', serializeSchema, (request, reply) => {
  reply.send(JSON.stringify(stack))
  console.log('Stack sent')
})

fastify.get('/', (request, reply) => {
  reply.send('Welcome to Fastify REST-API!')
  console.log(fastify.routes)
})

fastify.post('/addValue', postOptions, (request, reply) => {
  request.log.info('Adding the element to the stack...')
  reply.code(201)
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
  request.log.info('Removing the top-most element in the stack...')
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