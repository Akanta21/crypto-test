import createMiddleware from 'swagger-express-middleware'
import express from 'express'
import path from 'path'
import http from 'http'

import router from './routes'
import { getSwaggerDocument } from './lib/swagger'

const swaggerDoc = getSwaggerDocument(
  path.join(__dirname, 'swagger.yml')
)

let app = express()

createMiddleware(swaggerDoc, app, (error, middleware) => {
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.parseRequest(),
    middleware.validateRequest()
  )

  app.use('/v1', router)
  app.get('/health', (_, res) => res.send('alive'))
  app.get('/api-doc', (_, res) => res.json(swaggerDoc))

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      status: error.status,
      message: error.message,
    })
  })

  app.server = http.createServer(app)
  app.server.listen(process.env.PORT || 8090, () => {
    console.log(`Started on port ${app.server.address().port}`)
  })
})

export default app
