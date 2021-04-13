import jwt from 'jsonwebtoken'
const jwtToken = process.env.JWT_TOKEN || 'someranfomstring'
const generateToken = (id) => {
  return jwt.sign({ id }, jwtToken, {
    expiresIn: '30d',
    algorithm: 'HS256'
  })
}

export default generateToken
