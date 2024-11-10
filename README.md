# TripMate

TripMate is a trip management web application that allows users to create and join trips, manage personal and group checklists, and collaborate with fellow travelers. The platform offers user authentication, trip-based collaboration features, and a responsive interface for seamless trip organization.

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Link](#project-link)
- [Installation and Setup](#installation-and-setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- **User Authentication**: Secure user login and registration using JWT tokens and password hashing with bcrypt
- **Trip Creation and Management**: Users can create trips and generate unique shareable codes for inviting other users
- **Personal and Group Checklists**: Custom CRUD operations for managing checklists with visibility settings
  - Group checklists: Shared among all trip members
  - Personal checklists: Visible only to the individual user
- **Responsive UI**: Built using React and styled with Tailwind CSS for a seamless user experience across devices
- **Secure API Endpoints**: Built with Express and Node.js for handling all backend operations securely

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt
- **Containerization**: Docker (Optional)

## Project Link
[TripMate - Live Demo](https://tripmatee.vercel.app/)

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB instance or cluster
- Docker (optional for containerization)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/tripmate.git
cd tripmate
```

2. Install dependencies for both client and server:
```bash
# In the project root directory:
npm install
cd client
npm install
```

3. Configure environment variables (see [Environment Variables](#environment-variables))

4. Start the server:
```bash
# From the project root
npm run dev
```

5. Start the client:
```bash
# From the client directory
npm start
```

6. Visit http://localhost:3000 to access the application

## Folder Structure
```bash
tripmate/
  ├── client/          # Frontend (React)
  ├── server/          # Backend (Express, Node.js)
  ├── .env.example     # Example environment variables
  └── README.md        # Project documentation
```

## Environment Variables
Create a `.env` file in the root directory with the following keys:
```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000 # or your desired port number
```

## API Endpoints

### User Authentication
- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login

### Trip Management
- `POST /api/trip/create`: Create a new trip
- `GET /api/trip/join/:tripCode`: Join an existing trip using a code

### Checklist Management
- `GET /api/checklist/group/:tripId`: Get group checklist for a trip
- `POST /api/checklist/group/:tripId`: Add an item to the group checklist
- `GET /api/checklist/personal/:userId`: Get personal checklist for a user
- `POST /api/checklist/personal/:userId`: Add an item to the personal checklist

## Features

### User Authentication
- User registration with email and password
- JWT-based authentication for secure API access

### Trip Management
- Users can create trips with unique codes for easy sharing
- Users can join trips using the code

### Checklist Management
- Group checklists are shared among all trip members and visible to everyone in the trip
- Personal checklists are visible only to the user who created them

### Responsive Design
- Built with React and styled using Tailwind CSS for a modern, responsive design

### Secure API
- Built with Express.js, all API endpoints are protected with JWT-based authentication

## Future Enhancements
- Real-time Updates: Implement real-time checklist updates using WebSockets
- Expense Management: Allow users to manage and split trip expenses
- Trip Itinerary: Add trip itinerary creation and management features
- Notifications: Implement push notifications for important updates and reminders

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
