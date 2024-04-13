# medical care healthy server

medical care healthy is a web application designed to manage appointments and bookings for a medical clinic. It provides features for users to schedule appointments with doctors, administrators to manage doctors and appointments, and a payment system for booking confirmations.

## Technologies Used

- express
- jsonwebtoken
- mongodb
- stripe

## Features

- **User Authentication**: Users can register, login, and obtain JSON Web Tokens (JWT) for authentication.
- **Appointment Scheduling**: Users can view available appointment options, book appointments, and receive confirmation emails.
- **Administrator Dashboard**: Administrators can manage doctors, view bookings, and grant administrative privileges.
- **Stripe Integration**: Integration with Stripe for processing payments for bookings.
- **MongoDB Database**: Data is stored in a MongoDB database for persistence.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Rahulfordev/medical-care-healthy-server.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   MONGO=your_mongodb_connection_url
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ACCESS_TOKEN=your_jwt_access_token_secret
   PORT=5000
   ```

   Replace `your_mongodb_connection_url`, `your_stripe_secret_key`, and `your_jwt_access_token_secret` with your MongoDB connection URL, Stripe secret key, and JWT access token secret, respectively.

## Usage

1. Start the server:

2. Access the application in your web browser at `http://localhost:5000`.

## API Endpoints

- `GET /appointmentOptions`: Retrieve available appointment options.
- `GET /v2/appointmentOptions`: Retrieve available appointment options with advanced querying.
- `GET /appointmentSpecialty`: Retrieve available appointment specialties.
- `GET /bookings`: Retrieve bookings for a user.
- `GET /bookings/:id`: Retrieve a specific booking by ID.
- `POST /bookings`: Create a new booking.
- `GET /jwt`: Generate a JWT for a user.
- `GET /users`: Retrieve all users.
- `POST /users`: Create a new user.
- `GET /users/admin/:email`: Check if a user is an admin.
- `PUT /users/admin/:id`: Promote a user to admin.
- `POST /doctors`: Add a new doctor (admin only).
- `GET /doctors`: Retrieve all doctors (admin only).
- `DELETE /doctors/:id`: Delete a doctor (admin only).
- `POST /create-payment-intent`: Create a payment intent for booking.
- `POST /payments`: Process a payment for a booking.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
