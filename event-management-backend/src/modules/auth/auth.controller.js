const authService = require('./auth.service');
const { registerValidator, loginValidator } = require('./auth.validator');


const register = async (req, res) => {
    try {
        const error = registerValidator(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error });
        }

        const user = await authService.register(req.body)

        res.status(201).json({ success: true, message: "User registered successfully", data: user })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const login = async (req, res) => {
    try {
        const error = loginValidator(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error });
        }

        const data = await authService.login(req.body);

        res.json({
            success: true,
            message: "Login successful",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
};