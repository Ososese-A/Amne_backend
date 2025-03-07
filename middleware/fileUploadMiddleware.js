const multer = require('multer');
const path = require('path');

// Store files in memory for sometime
const storage = multer.memoryStorage(); 
const upload = multer({
    storage: storage,
    // Limit: 5MB
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        console.log(`This is from the multer middleware to check MIME type: ${file.mimetype}`)

        console.log(`original file name: ${file.originalname}`)
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        console.log(`MIME type check: ${mimetype}`);
        console.log(`Extension check: ${extname}`);

        // if (mimetype && extname) {
        if (extname) {
            // Accept image files
            cb(null, true); 
        } else {
            // Reject non-image files
            cb(new Error('Only image files are allowed!'), false); 
        }
    }
});

module.exports = {upload}