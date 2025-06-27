# Productivity App

A full-stack productivity application built with Next.js, featuring task management with authentication and real-time updates.

## Features

- 🔐 Authentication with email/password and Google sign-in
- ✅ Todo management with CRUD operations
- 🎯 Priority levels for tasks
- 📅 Due date tracking
- 🔄 Real-time state management
- 🎨 Modern UI with Tailwind CSS
- 🚀 Server-side rendering with Next.js
- 🗄️ MongoDB database integration
- 🔒 Protected routes
- 🎭 Role-based access control

## Tech Stack

- **Frontend:**
  - Next.js 15.3
  - React 19
  - Redux Toolkit
  - Redux Saga
  - Tailwind CSS
  - TypeScript

- **Backend:**
  - Next.js API Routes
  - MongoDB with Mongoose
  - Firebase Admin
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB instance
- Firebase project with authentication enabled

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=your_mongodb_uri

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/productivity-app.git
cd productivity-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── middleware/      # API middleware
│   ├── models/          # MongoDB models
│   ├── services/        # API services
│   ├── store/           # Redux store configuration
│   ├── types/           # TypeScript type definitions
│   └── theme/           # Theme configuration
├── public/              # Static files
└── package.json         # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
