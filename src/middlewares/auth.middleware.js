import { asynchHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";




export const verifyJWT = asynchHandler(async(req,res,next) => {
    try {const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")


    if(!token){
        throw new ApiError(401,"Unauthorized access")
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Unauthorized access")
    }

    req.user = user;
    next()
    }catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")  
    }
})