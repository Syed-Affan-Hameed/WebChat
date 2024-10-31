import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import prismaClient from "../db/prisma.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      res.send(400).json({
        error: "Please fill all the fields",
      });
    }
    if (password !== confirmPassword) {
      res.send(400).json({
        error: "Passwords dont match!",
      });
    }
    // checking whether the username(which must be unique as per the db schmema) already exists in the User Table

    const user = await prismaClient.user.findUnique({
      where: { username: username },
    });
    //if we find thew user then we throw error
    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }
    const salt = await bcryptjs.genSalt(15);
    const hashedPassword = await bcryptjs.hash(password, salt);
    let GenericProfilePic="";
    if (gender == "male") {
       GenericProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else {
       GenericProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }

    const newUser = await prismaClient.user.create({
        data:{
            fullname:fullname,
            username:username,
            password:hashedPassword,
            gender:gender,
            profilePic:GenericProfilePic,
        }
    });

    if(newUser){

    }

  } catch (error: any) {
    console.log("Error in signup endpoint", error);
    res.status(500).json({
      error: `Internal Server Error: Error during signup - ${error.message}`
    });
  }
};
