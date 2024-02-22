const fs = require('fs');
const path = require('path');

const ImageController = {
  uploadImage: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
      }

      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '../uploads');

      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Move the uploaded file to the uploads directory
      const fileName = `${Date.now()}_${imageFile.name}`;
      imageFile.mv(path.join(uploadDir, fileName), (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ message: 'Failed to upload file' });
        }
        res.status(201).json({ message: 'File uploaded successfully', imageUrl: `/uploads/${fileName}` });
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getImage: (req, res) => {
    try {
      const imageName = req.params.imageName;
      const imagePath = path.join(__dirname, `../uploads/${imageName}`);

      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Serve the image
      res.sendFile(imagePath);
    } catch (error) {
      console.error('Error getting image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = ImageController;
