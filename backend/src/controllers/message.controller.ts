import { Request, Response } from "express";
import prismaClient from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const recieverId = id;
    const senderId = res.locals.userId;

    // checking whether  the message is already a part of the conversation
    let Conversation = await prismaClient.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, recieverId],
        },
      },
    });

    // if the conversation is not found then we create a new one
    if (!Conversation) {
      Conversation = await prismaClient.conversation.create({
        data: {
          participantIds: {
            set: [senderId, recieverId],
          },
        },
      });
    }

    const newMessage = await prismaClient.message.create({
      data: {
        senderId: senderId,
        body: message,
        conversationId: Conversation.id,
      },
    });

    if (newMessage) {
      Conversation = await prismaClient.conversation.update({
        where: {
          id: Conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });

      //socket.io for real time messages
      //first, we get the socketId of the receiver using their receiverId
      const recieverSocketId = getReceiverSocketId(recieverId);
      //reciever will have sokect id is the user is online
      if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage",newMessage);
      }
      // Send success response with the created message
      res.status(201).json(newMessage);
    } else {
      // Handle case where message creation failed
      return res.status(400).json({
        success: false,
        error: "Failed to create message",
      });
    }
  } catch (error: any) {
    console.error("Error in send message!");

    res.status(400).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessages = async(req:Request,res:Response):Promise<any> =>{
// We use this method when we click on a conversation to start chatting with someone
    try {
        const {id} =req.params;
        const idOfTheUserToChatWith =id;
        const idOfTheCurrentUser = res.locals.userId;

        const conversation = await prismaClient.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[idOfTheCurrentUser,idOfTheUserToChatWith]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        // if conversation does note exist then just return ann empty array

        if(!conversation){
           return res.status(200).json([]);
        }
        else{
            return res.status(200).json(conversation.messages);
        }


    } catch (error) {
        
    }

}
export const getUsersWithConversations =async(req:Request,res:Response): Promise<any> => {

    try {
        const verifiedUserId =res.locals.userId;

        const users = await prismaClient.user.findMany({
            where:{
                id:{
                    not: verifiedUserId
                }
            },
            select:{
                id:true,
                fullname:true,
                profilePic:true,
                username:false,
                password:false
            }
        })
        return res.status(200).json(users)
    } 
    catch (error:any)
    {
        console.error("Error in the getConversation method");
        
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}