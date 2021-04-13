import jwt from 'jsonwebtoken'
const jwtToken = 'testsecret'
const generateToken = (id) => {
  return jwt.sign({ id }, jwtToken, {
    expiresIn: '30d',
    algorithm: 'HS256'
  })
}

export default generateToken
