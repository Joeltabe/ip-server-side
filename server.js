const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
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
const videoRoutes = require('./routes/videoRoute');
const userRoutes = require(`./routes/userRoute`);
const categoryRoutes = require(`./routes/categoryRoute`);

app.use('/api/videos', videoRoutes);
app.use(`/api/user`, userRoutes);
app.use(`/api/category`, categoryRoutes);

// Configure Multer for video upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a default route handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
