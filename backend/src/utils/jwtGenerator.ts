const jwt = require('jsonwebtoken')
require('dotenv').config()

export const jwtGenerator = (user_id: number) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'} )
}


