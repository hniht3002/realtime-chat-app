import Conversation from "../models/conversations.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try{
        const message = req.body.message;
        const receiverId = req.params.userId;

        const senderId = req.user._id.toString();

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            content: message,
            senderId: senderId,
            recipientId: receiverId
        })

        console.log(newMessage)

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO HERE

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);

    } catch(err) {
        console.log('Error in sendMessage controller: ', err.message)
        res.status(500).json({error: "Server error"});
    }
}


export const getMessage = async (req, res) => {
    try {
        const userToChatId = req.params.userId;

        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (err) { 
        console.log('Error in getMessage controller: ', err.message)
        res.status(500).json({error: "Server error"});
    }
}