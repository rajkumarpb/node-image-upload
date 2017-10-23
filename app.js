const express = require('express');
const multer = require('multer');
const path = require('path');

// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// INITIALIZE UPLOAD
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// CHECK FILE TYPE
function checkFileType(file, cb) {
  // ALLOWED FILE EXTENSIONS
  const fileTypes = /jpeg|jpg|png|gif/;
  // CHECK EXTENSION
  const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
  // CHECK MIMETYPE
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Images Only');
  }
}

// INITIALIZE
const app = express();

// EJS
app.set('view engine', 'ejs');

// SETTING STATIC PUBLIC FOLDER
// ALLOWS ACCESS THESE FILES DIRECTLY FROM THE BROWSER
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render('index', { msg: err });
    } else {
      if (req.file === undefined) {
        res.render('index', { msg: 'Error: No File Selected' });
      } else {
        res.render('index', { msg: 'File Uploaded!', file: `uploads/${req.file.filename}` });
      }
    }
  });
});

// START SERVER
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
