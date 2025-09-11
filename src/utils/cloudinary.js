import { v2 as cloundinary } from 'cloudinary'
import fs from 'fs'

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUploading = async (filePath) => {
    try {
        if (!filePath) return null
        // upload the file on cloudinary next 
        const response = await cloundinary.uploader.upload(filePath,{
        resource_type: "auto"
       })
       // to check the file is uploaded or not
       console.log("file is uploaded", response.url)
       return response
    } catch (error) {
        fs.unlinkSync(filePath) // removing file from server 
        return null
    }
}
export {fileUploading}