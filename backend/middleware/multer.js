import multer from "multer";
import path from "path";

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({storage})

// // Configure multer
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
//     fileFilter: function (req, file, cb) {
//         const allowedFileTypes = /jpeg|jpg|png|gif/;
//         const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedFileTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error("Only images are allowed!"));
//         }
//     }
// });

export default upload;
