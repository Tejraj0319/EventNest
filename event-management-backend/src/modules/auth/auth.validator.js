const registerValidator = (data) => {
    const { email, password, role } = data;

    if (!email || !password) {
        return "Email and password are required";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    if (role && !["USER", "ORGANIZER"].includes(role)) {
        return "Invalid role";
    }

    return null;
};

const loginValidator = (data) => {
    const { email, password } = data;

    if (!email || !password) {
        return "Email and password are required";
    }

    return null;
};

module.exports = {
    registerValidator,
    loginValidator,
};
