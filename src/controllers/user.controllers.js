import {ApiError} from "..utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
    //1. get usrer details from frontend
    const {fullname, usrername, email, password} = req.body;
    console.log("email: ", email);
    console.log("username: ", usrername);
    console.log("fullname: ", fullname);
    console.log("password: ", password);

    //2. validating 
    if([fullname, usrername, email, password].some(filed =>(
        filed?.trim() === ''
    )))
    {
        throw new ApiError(400, "all fields are required")
    }

    //2.1 check user exist or  not 
    const existingUser = User.findOne({
        $or: [{usrername}, {email}]
    })
    if(existingUser){
        throw new ApiError(409, "username or email already exist\n Login please!")
    }

    //3 check for avatar and coverImage // avatar must exist
    // files is prowided by multer 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //4. upload files on cloudinary. it can take time so use async
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //5 create user 
    const user = await User.create({
        fullname,
        usrername: usrername.lowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wring while creating the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully!")
    )

} )
export {
    registerUser,
}