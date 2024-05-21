import expressAsyncHandler from "express-async-handler";
import multer from "multer";

// Use multer to upload to memory storage for processing later
const uploadMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    await new Promise((resolve, reject) => {
      upload.single("image")(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload images to multer memory storage" });
  }
});

export { uploadMiddleware };
