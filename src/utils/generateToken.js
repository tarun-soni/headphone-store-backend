import jwt from 'jsonwebtoken'
const jwtToken = 'testsecret'
const generateToken = (user) => {
  return jwt.sign({ user }, jwtToken, {
    expiresIn: '30d',
    algorithm: 'HS256'
  })
}

export default generateToken
