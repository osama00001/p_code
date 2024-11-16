import multer, {diskStorage} from "multer"
import path from "path"
const storage = diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/temp")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer({storage})