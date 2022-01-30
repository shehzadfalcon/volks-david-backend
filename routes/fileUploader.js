const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//for single image upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    let uri = process.env.BACKEND_URL;
    if (req.file) {
      let filePath = req.file.path; //file path
      uri = uri + "/" + filePath;
    }

    res.json({ uri });
  } catch (error) {
    console.log("error message----->", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
