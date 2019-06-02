import fs from 'fs'
import yaml from 'yaml'

const readSwagger = (path) => {
  return yaml.parse(fs.readFileSync(path).toString('utf-8'))
}

const setScheme = (swagger) => {
  if (process.env.NODE_ENV != 'production') {
    swagger.schemes = ['http']
  }

  return swagger
}

const getSwaggerDocument = (path) => setScheme(readSwagger(path))

export {
  getSwaggerDocument
}
