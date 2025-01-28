# 📚 Modern Library Management System

A comprehensive full-stack web application for managing library resources with real-time updates and a responsive user interface.

## 🌟 Live Demo & Repositories

- **Live Demo:** [Library Management System](https://loquacious-beijinho-e8ceb8.netlify.app/)
- **Frontend Repository:** [GitHub Frontend](https://github.com/rishisankhla/library-web-app-frontend)
- **Backend Repository:** [GitHub Backend](https://github.com/rishisankhla/library-web-app-backend)

## 🚀 Features

### Authentication & Authorization
- Secure user authentication using Firebase Auth
- Role-based access control (Admin/User permissions)
- Protected routes and API endpoints
- JWT token management

### Responsive UI/UX
- Fluid animations and transitions using CSS
- Mobile-first design approach
- Custom mobile navigation with iOS safe-area handling
- Responsive tables with mobile-optimized card views

### Real-time Features
- Live updates for book status and requests
- Real-time data synchronization with Firebase
- Optimistic UI updates for better user experience
- WebSocket integration for real-time notifications

### Modern Design Implementation
- Custom CSS animations and transitions
- Tailwind CSS for utility-first styling
- Dynamic theme handling
- Skeleton loading states
- Toast notifications
- Responsive grid layouts

## 💻 Technology Stack

### Frontend
- React.js (Hooks, Context API, Custom Hooks)
- Tailwind CSS
- CSS3 (Custom animations)
- React Context API
- Axios for API calls
- React Spinners
- Firebase SDK
- React Router
- React Error Boundary

### Backend
- Node.js
- Express.js
- Firebase Authentication
- Firebase Realtime Database
- RESTful API architecture
- Express Middleware
- Express Router
- Body Parser
- CORS

### Database
- Firebase Realtime Database
- Data modeling
- Real-time listeners
- Security rules

### Development Tools
- Git for version control
- npm for package management
- Create React App
- Environment configuration
- ESLint
- Prettier

### Deployment
- Frontend: Netlify
- Backend: Render
- CI/CD pipeline

## 🛠️ Technical Implementations

### React & Frontend Concepts
- Custom hooks (useBookApproval, useBookApprovalSort, useBookApprovalFilter)
- React Context API for global state management
- React Functional Components with Hooks
- Controlled Components for form handling
- Component composition and reusability
- Conditional rendering
- Memoization with useMemo
- Custom error boundaries

### Node.js & Express Concepts
- RESTful API architecture
- Middleware implementation for authentication
- Error handling middleware
- Request validation
- CORS handling
- Environment configuration
- Route handlers and controllers
- Async/await for database operations

### Full Stack Integration
- JWT token-based authentication
- Real-time data synchronization
- CRUD operations
- API error handling
- Cross-origin resource sharing
- Data validation on both ends
- Secure password handling
- File structure best practices
- Environment variable management
- Database schema design

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Firebase account
- Git

### Installation

1. Clone the repositories
```bash
git clone https://github.com/rishisankhla/library-web-app-frontend.git
git clone https://github.com/rishisankhla/library-web-app-backend.git
```

2. Install dependencies for frontend
```bash
cd library-web-app-frontend
npm install
```

3. Install dependencies for backend
```bash
cd library-web-app-backend
npm install
```

4. Set up environment variables
- Create `.env` file in frontend directory
- Create `.env` file in backend directory
- Add necessary environment variables (Firebase config, API URLs, etc.)

5. Start the development servers
```bash
# Frontend
npm start

# Backend
npm run dev
```

## 📱 Application Features

- Book management (add, update, delete)
- User management
- Book borrowing system
- Real-time notifications
- Search and filter functionality
- Admin dashboard
- User dashboard
- Responsive design for all devices

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
