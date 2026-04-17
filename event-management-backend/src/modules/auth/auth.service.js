const prisma = require('../../config/db')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (data) => {
    const { email, password, role } = data
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        throw new Error("user already exists!")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            role: role || "USER"
        }
    })
    return user;
}


const login = async (data) => {
    const { email, password } = data
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("user not found!")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Invalid credentials password not matching!");
    }
    // generate token
    const token = jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    return {
        user,
        token
    }
}

module.exports = {
    register,
    login,
};