# Local File Upload

A simple application used for uploading images directly to the server. The application also validates extensions and prevents submitting the form without an image.

### TECHNOLOGIES/NPM MODULES
1. multer
2. Node.js
3. Express.js

### FUTURE
1. Upload photos to an image hosting API instead, unless you're on a monster server!

### DOCUMENTATION
1. multer: https://github.com/expressjs/multer

### CODE SAMPLE
1. Use RegEX to check the uploaded image for the correct file type. Grabs the image extension from the uploaded image using the path module. For extra precaution, we use the mimeType just incase the user changes the extension on the image before uploading.

```javascript
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
```