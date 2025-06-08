const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, "./uploads");
    },
    
const { v4: uuidv4 } = require('uuid'); 

filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const base = file.originalname.replace(/\s/g, "_").replace(/\.[^/.]+$/, "");
    const uniqueName = `${base}_${Date.now()}_${uuidv4()}.${ext}`;
    cb(null, uniqueName);
}


var fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|epub|djvu|PFD|EPUB|DJVU|png)$/)) {
        return callback(new Error('Invalid file format'), false)
    }
    callback(null, true)
}

const fileUpload = (fieldName) => (req, res, next) => {
    multer({
        storage,
        fileFilter: fileFilter,
    }).array(fieldName, 100)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (req.files) {
            console.log("Uploaded Files:");
            req.files.forEach(file => {
                console.log(`- ${file.originalname} -> ${file.filename}`);
            });
        }

        next();
    });
};

module.exports = fileUpload
