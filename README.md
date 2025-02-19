# Skill Connect Backend Documentation

This repository contains the backend code for a web application designed to manage user authentication, mentor availability, bookings, and various services. The backend is built using Node.js, Express, and MongoDB, with additional integrations for third-party services like Razorpay, Zoom, and Cloudinary.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Environment Variables](#environment-variables)
3. [Installation](#installation)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
6. [Dependencies](#dependencies)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Structure

The project is organized into the following directories and files:

### 1. **Root Directory**
- **`config/`**
  - `dbConfig.js`: Handles MongoDB connection logic.
  - `index.js`: Manages configuration settings for different environments (e.g., development, production).

- **`controllers/`**
  - `authController.js`: Manages user authentication (registration, login, logout, JWT token management).
  - `availabilityController.js`: Handles mentor availability (adding, updating, fetching slots).
  - `bookingController.js`: Manages user bookings (creating, updating, canceling, viewing details).
  - `mentorController.js`: Handles mentor-related actions (profile management, retrieving details).
  - `serviceController.js`: Manages services offered by mentors.
  - `userController.js`: Manages user data and profile-related actions.
  - `webhookController.js`: Handles webhook events for third-party integrations (e.g., Razorpay).

- **`utils/`**
  - `apiError.js`: Utility class for consistent API error responses.
  - `asyncHandler.js`: Simplifies async function handling in routes by catching errors.

- **`middleware/`**
  - `auth.js`: Middleware for user authentication and JWT token verification.
  - `validate.js`: Middleware for validating incoming request bodies.
  - `upload.js`: Middleware for uploading photos to Cloudinary.

- **`schema/`**
  - `availabilitySchema.js`: MongoDB schema for mentor availability.
  - `bookingSchema.js`: Schema for user bookings.
  - `serviceSchema.js`: Schema for mentor services.
  - `userSchema.js`: Schema for user data.

- **`routes/v1/`**
  - `authRoute.js`: Routes for authentication (register, login, logout).
  - `availabilityRoute.js`: Routes for mentor availability.
  - `bookingRoute.js`: Routes for booking-related operations.
  - `homeRoute.js`: Home or status check route.
  - `mentorRoute.js`: Routes for mentor management.
  - `serviceRoute.js`: Routes for mentor services.
  - `userRoute.js`: Routes for user profile management.
  - `webhookRoute.js`: Routes for webhook events.

- **`services/`**
  - `authService.js`: Business logic for authentication.
  - `availabilityService.js`: Logic for mentor availability.
  - `bookingService.js`: Logic for bookings.
  - `emailService.js`: Manages email sending (e.g., confirmation emails).
  - `mentorService.js`: Logic for mentor management.
  - `servicesService.js`: Logic for mentor services.
  - `jwtToken.js`: Handles JWT token generation and validation.
  - `userService.js`: Logic for user profile management.
  - `zoomService.js`: Handles Zoom integration for virtual meetings.

- **`emailtemplate/`**
  - `confirmationEmail.ejs`: Template for confirmation emails.

- **`validations/`**
  - `authValidation.js`: Joi validation for authentication.
  - `availabilityValidation.js`: Validation for mentor availability.
  - `bookingValidation.js`: Validation for bookings.
  - `serviceValidation.js`: Validation for mentor services.
  - `userValidation.js`: Validation for user-related operations.

- **Other Files**
  - `.env`: Environment variables configuration.
  - `.gitignore`: Specifies files to ignore in Git.
  - `app.js`: Entry point for Express application setup.
  - `index.js`: Initializes the server and connects to MongoDB.
  - `package.json`: Project metadata and dependencies.
  - `package-lock.json`: Records exact package versions.

---

## Environment Variables

The following environment variables are required to run the application. Create a `.env` file in the root directory and add the following:

```plaintext
PORT=
MONGODB_URL=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRATION_MINUTES=
JWT_VERIFICATION_SECRET=
JWT_VERIFICATION_EXPIRATION_MINUTES=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
SMTP_PASSWORD=
SMTP_USERNAME=
EMAIL_FROM=
SMTP_HOST=
SMTP_PORT=
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gautamaggarwaldev/Skill_Connect_backend.git
   cd skill-connect-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file as described above.

---

## Running the Server

To start the server, run:
```bash
npm start
```

For development with hot-reloading, use:
```bash
npm run dev
```

---

## API Endpoints

The API is organized into the following routes:

- **Authentication**: `/api/v1/auth`
- **Mentor Availability**: `/api/v1/availability`
- **Bookings**: `/api/v1/booking`
- **Mentor Management**: `/api/v1/mentor`
- **Services**: `/api/v1/service`
- **User Profile**: `/api/v1/user`
- **Webhooks**: `/api/v1/webhook`

Refer to the respective route files in `routes/v1/` for detailed endpoint documentation.

---

## Dependencies

Key dependencies include:
- **Express**: Web framework.
- **Mongoose**: MongoDB ODM.
- **JWT**: JSON Web Tokens for authentication.
- **Cloudinary**: Image upload and management.
- **Razorpay**: Payment gateway integration.
- **Zoom**: Virtual meeting integration.
- **Nodemailer**: Email sending.
- **Bcrypt**: For hashed password.
- **Joi**: For validation.
- **Moment**: Date.
- **Multer**: upload photos.
- **Dotenv**: environment variables.
- **Axios**: for fetch api.

For a complete list, see `package.json`.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For any questions or issues, please open an issue in the repository.