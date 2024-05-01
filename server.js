const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose= require(`mongoose`)

// Load environment variables from .env file
dotenv.config();


// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());


// Connect to the database
connectDB();
      
cloudinary.config({ 
  cloud_name: 'dijypm3uf', 
  api_key: '544375846183294', 
  api_secret: 'T2g5yxNfMUTebdAk-BQJo2kNCNA' 
});
// Define your routes here
// For example:
// const videoRoutes = require('./routes/videoRoute');
// const userRoutes = require(`./routes/userRoute`);
// const categoryRoutes = require(`./routes/categoryRoute`);

// app.use('/api/videos', videoRoutes);
// app.use(`/api/user`, userRoutes);
// app.use(`/api/category`, categoryRoutes);
// Define Video model
const Video = mongoose.model('Video', require('./models/videoModel'), 'videos');

// Configure Multer for video upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    // Check if req.file is defined
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No file provided in the request' });
    }

    // Upload video to Cloudinary
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: 'Error uploading to Cloudinary' });
      }

      // Save video details to MongoDB with Cloudinary URL
      const video = new Video({
        title: req.body.title || 'Untitled Video',
        videoUrl: result.secure_url,
      });
      

      await video.save();

      res.status(201).json({ message: 'Video uploaded successfully'});
    }).end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Error uploading video' });
  }
});

// Define a default route handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
