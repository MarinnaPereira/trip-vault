import multer from 'multer';
import path from 'path';
import { join } from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // const uploadsDir = new URL('../../uploads', import.meta.url).pathname;
//     // console.log('uploadsDir', uploadsDir);
//     const uploadsDir = join(process.cwd(), 'uploads');
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const filename =
//       file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload only images.'), false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// const handleUpload = multer({ storage: storage });

// export const replaceFile = (req, res, next) => {
//   console.log('req.body', req.body);
//   console.log('req.files', req.files);
//   //   req.files.file = req.body.file;
//   next();
// };

const upload = multer({ dest: 'uploads/' });
const handleUpload = upload.fields([{ name: 'file', maxCount: 1 }]);

export { handleUpload };
