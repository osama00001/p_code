import { v2 as cloudinary } from 'cloudinary';
import { AppError } from './AppError';
import { promises as fs } from 'fs';

  cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  export default cloudinary;


  const uploadfileToCloudinary= async(localFilePath)=>{
    try{
        if (!localFilePath)  throw new AppError("File path is missing",401)
        let response = await cloudinary.uploader
        .upload( localFilePath, { folder: "uploads",  resource_type: "auto" }
        )
        console.warn("file is uploaded successfully",response.url)
        return response

    }catch(err){
        await fs.unlink(localFilePath);
        throw new AppError("something went wrong with cloudinary",500)
    }

  }