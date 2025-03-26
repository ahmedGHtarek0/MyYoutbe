import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';


// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name:'doffya9pr',
    api_key: '897295137123911',
    api_secret:'IzDxuHnIqGXfyimkh167cSC9ZgA'
});

// 🔹 Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({

    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'arryahmed', // Cloudinary folder
            public_id: new Date().toISOString().replace(/:/g ,"-")+file.originalname, // Keep original filename
            resource_type: 'image' // Auto-detect file type (image, pdf, etc.)
        };
    }


});
const fileFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};
// 🔹 Export Multer Middleware
export const cloude = multer({ storage ,fileFilter});
