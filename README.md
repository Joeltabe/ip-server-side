## ip23movies Server-Side Code

### Description
This repository contains the server-side code for **ip23movies**, a movie streaming platform. Built using Node.js and Express.js, this server handles authentication, video streaming, and other backend functionalities required for the platform.

### Features
- **User Authentication:** Provides endpoints for user registration, login, and authentication using JSON Web Tokens (JWT).
- **Video Streaming:** Implements routes for fetching and streaming video content to authenticated users.
- **Database Integration:** Utilizes MongoDB for storing user data and video metadata, with Mongoose as the ODM (Object Data Modeling) library.
- **Middleware:** Includes middleware for parsing JSON bodies, enabling CORS (Cross-Origin Resource Sharing), and handling 404 errors for undefined routes.

### Technologies Used
- **Node.js:** JavaScript runtime environment for server-side development.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database for storing user data and video metadata.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **JSON Web Tokens (JWT):** Secure method for transmitting information between parties as a JSON object.
- **dotenv:** Module for loading environment variables from a .env file into process.env.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing in Express.js.

### Installation
1. Clone the repository: `git clone https://github.com/Joeltabe/ip-server-side.git`
2. Navigate to the project directory: `cd ip23movies-server`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root directory and define variables like `PORT`, `MONGO_URI`, and `JWT_SECRET`.
5. Start the server: `npm start`

### Usage
- Register a new user using the `/api/user/register` endpoint.
- Log in with registered credentials using the `/api/user/login` endpoint to receive a JWT token.
- Access video content using authenticated routes like `/api/videos` for streaming.

### Contributors
- [Tabe Joel](https://github.com/Joeltabe) - Lead Developer

### License
This project is licensed under the [MIT License](LICENSE).

### Support
For any inquiries or support, please contact us at joeltabe3@gmail.com.