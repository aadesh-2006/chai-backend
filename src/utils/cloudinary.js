import {v2 as cloudinary} from 'cloudinary';

import fs  from 'fs';







    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


const uploadOnCloudinary = async (loaclFilePath) => {
    try { 
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(loaclFilePath,{
            resuorce_types: "auto"
        })
        console.log("file is uploaded on cloudinary",response.url);
        return response
    } catch (error){
        fs.unlinkSync(localFilePath) // remove the localy saved temp file
        return null;
    }
}
    

export { uploadOnCloudinary }



cloudinary.v2.uploader.upload("https://upload.wikimedia.ord/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function(error, result) {console.log(result);}
);