import User from "../models/user.model.js";


export const getUserForSidebar = async (req, res, next) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        return res.status(200).json(filteredUser)

    } catch (err) {
        console.log('Error in getUserForSidebar controller: ', err.message)
        res.status(500).json({error: "Server error"});
    }

}