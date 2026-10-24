import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async(req,res) => {
    // get user details from frontend
// validation - not empty , string given as string ,  int given as int and etc 
// check if user already exists : can be done from unique varibles of users like username,email etc
// check whter for images and check for avtar
// upload then on cloudnairy , avatar
// create user object - create entry in db 
// remove password and refresh token field from response
// check for user creation
// return response


const  {fullName,email,username,password}=req.body
console.log("email: ", email);

if(
    [fullName,email.username,password].some((field) => 
    field?.trim() === "")
){
    throw new ApiError(400,"All fields are required")
}
 
const existiesUser = User.findOne({
    $or: [ {username} , {email} ]
})
if(existiesUser){
    throw new ApiError(409, "User with email or usearName already exists")
}

const avatarLocalPath = req.files?.avatar[0]?.path ; 
const coverImageLocalPath = req.files?.coverImage[0]?.path ;

if(!avatarLocalPath){
    throw new ApiError  (400,"Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatarLocalPath){
    throw new ApiError  (400,"Avatar file is required")
}


const user = User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()

})

const createdUser = await User.findById(user._id).select(
    "-password -refeshToken"
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}


return res.status(201).json(
    new ApiResponse(200, createdUser,"User registered successfully")
)





 })
 

export {registerUser} 