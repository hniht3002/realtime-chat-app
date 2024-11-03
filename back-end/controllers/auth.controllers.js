export const login = (req, res) => {
    try{
        const [fname, uname, password, confPassword] = req.body()
    } catch(err) {
        
    }
}

export const signup = (req, res) => {
    res.send("Login")
}

export const logout = (req, res) => {
    res.send("Login")
}