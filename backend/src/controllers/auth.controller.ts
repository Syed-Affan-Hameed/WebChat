import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

import prismaClient from "../db/prisma.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
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
    let GenericProfilePic = "";
    if (gender == "male") {
      GenericProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else {
      GenericProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }

    const newUser = await prismaClient.user.create({
      data: {
        fullname: fullname,
        username: username,
        password: hashedPassword,
        gender: gender,
        profilePic: GenericProfilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);
      return res.status(201).json({
        success: true,
        message: "Succesfully Created a new user!",
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        error: "Invalid Data",
      });
    }
  } catch (error: any) {
    console.log("Error in signup endpoint", error);
    return res.status(500).json({
      error: `Internal Server Error: Error during signup - ${error.message}`,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userFound = await prismaClient.user.findUnique({
      where: { username: username },
    });
    if (!userFound) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    generateToken(userFound.id, res);
    return res.status(200).json({
      success: true,
      message: "Succesfully Logged In!",
      id: userFound.id,
      fullname: userFound.fullname,
      username: userFound.username,
      profilePic: userFound.profilePic,
    });
  } catch (error: any) {
    console.log("Error in login endpoint", error);
    return res.status(500).json({
      error: `Internal Server Error: Error during login - ${error.message}`,
    });
  }
};
