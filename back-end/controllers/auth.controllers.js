import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
        if(!isPasswordCorrect || !user) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        const userInfo = {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json(userInfo)

    } catch(err) {
        console.log('Error in login controller: ', err.message)
        res.status(500).json({error: "Server error"})
    }
}

export const signup = async (req, res) => {
    try{
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({username})

        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
   
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error: "Failed to create user"})
        }

    } catch (err) {
        console.log('Error in signup controller: ', err.message)
        res.status(500).json({error: "Server error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "User logged out"});
    } catch (err) {
        console.log('Error in logout controller: ', err.message)
        res.status(500).json({error: "Server error"})
    }
}