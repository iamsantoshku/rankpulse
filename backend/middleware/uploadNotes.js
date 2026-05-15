// import multer from "multer";

// import {
//   CloudinaryStorage
// } from "multer-storage-cloudinary";

// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,

//   params: async (req, file) => ({
//     folder: "rankpulse-notes",

//     resource_type: "raw",

//     public_id:
//       Date.now() +
//       "-" +
//       file.originalname
//   })
// });

// const upload = multer({
//   storage
// });

// export default upload;



import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "rankpulse-notes",

    resource_type: "raw",

    type: "upload",

    access_mode: "public",

    public_id:
      Date.now() + "-" + file.originalname,

    format: "pdf",
  }),
});

const upload = multer({
  storage,
});

export default upload;