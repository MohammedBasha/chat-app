export const signup = async (req, res) => {
    try {
        // get valuse from req.body that coming from client (frontend) - the input fields that passed from frontend
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = (req, res) => {
    res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
    res.json({ message: "logout successful" });
};
