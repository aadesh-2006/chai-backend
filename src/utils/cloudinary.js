
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded to Cloudinary:", response.url);
        await fs.promises.unlink(localFilePath);

        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error.message);

        if (localFilePath) {
            try {
                await fs.promises.unlink(localFilePath);
            } catch (cleanupError) {
                if (cleanupError.code !== "ENOENT") {
                    console.error("File cleanup failed:", cleanupError.message);
                }
            }
        }

        return null;
    }
};

export { uploadOnCloudinary };