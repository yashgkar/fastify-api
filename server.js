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
    },
    response: {
      201: {
        type: 'object',
        properties: {
          value: { type: 'string' }
        }
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
  request.log.info('Retrieving stack..') //Sending stack retrival message
  reply.send(JSON.stringify(stack))
  console.log('Stack sent')
})

fastify.get('/', (request, reply) => {
  reply.send('Welcome to Fastify REST-API!')
  console.log(fastify.routes)
})

fastify.post('/addValue', postOptions, (request, reply) => {
  request.log.info('Adding the element to the stack...') //Sending element push log
  reply.code(201)
  value = request.body.value
  stack.push(value)
  reply.send(stack)
})

fastify.put('/getLocation', (request, reply) => {
  request.log.info('Searching element location...') //Sending search info log
  findValue = request.body.value
  //check if value exists
  if (stack.indexOf(findValue) === -1) {
    request.log.error('No such element exists!') //Sending an error log 
    reply.send('Err: No such element found! Please check values')
  } else {
    reply.send(stack.indexOf(findValue))
  }
})

fastify.delete('/popElement', (request, reply) => {
  request.log.warn('Removing the top-most element in the stack...') //Warning of removal of top-most element
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