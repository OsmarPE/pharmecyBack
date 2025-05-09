import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // renombra con un ID único
    }
});

export const upload = multer({ storage: storage });


export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}