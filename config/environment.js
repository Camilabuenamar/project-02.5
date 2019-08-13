const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost:27017/Basi-Express-API-${env}`
const secret = 'guanabana'

module.exports = {dbURI, secret}
