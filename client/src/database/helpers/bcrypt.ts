const bcrypt = require('bcryptjs')

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password)
}

export const comparePassword = (inputPassword: string, hashPassword: string) => {
return bcrypt.compareSync(inputPassword, hashPassword)
}