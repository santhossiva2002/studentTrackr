# 📚 StudentTrackr



## 🌟 Overview

StudentTrackr is a modern, responsive web application built with React that provides an intuitive dashboard for managing student information, course enrollments, and academic performance tracking. This project showcases my frontend development skills using modern React patterns and UI design principles.

Live Demo - https://santhossiva2002.github.io/studenttrackr/

## ✨ Features

- **Responsive Dashboard**: Comprehensive overview of student statistics and key metrics
- **Dynamic Student Management**: Add, view, and filter students with real-time updates
- **Course Tracking**: Monitor course enrollments and academic performance
- **Interactive Data Visualization**: Clean, intuitive representation of academic data
- **User Authentication**: Secure access control with Firebase Authentication
- **Detailed Student Profiles**: Expanded student information with academic history
- **Mobile-First Design**: Seamless experience across all device sizes

## 💻 Technologies Used

- **React 18**: Leveraging the latest React features and patterns
- **TypeScript**: Type-safe codebase for improved developer experience
- **React Query**: For efficient data fetching and cache management
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Shadcn UI**: Component library based on Radix UI primitives
- **Firebase Authentication**: For secure user authentication
- **React Hook Form**: For efficient form handling and validation
- **Recharts**: For interactive and responsive data visualization
- **Wouter**: Lightweight routing for React applications

## 🎨 Design Philosophy

StudentTrackr follows a clean, modern design philosophy with an emphasis on:

- **Accessibility**: WCAG compliant interface elements and color schemes
- **Intuitive Navigation**: Logical information architecture and user flow
- **Visual Hierarchy**: Clear distinction between primary and secondary information
- **Consistent UI Language**: Unified design patterns throughout the application
- **Meaningful Animations**: Subtle transitions that enhance user experience

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Optimized for portrait orientation with easy thumb navigation
- **Tablet**: Enhanced layout taking advantage of increased screen real estate
- **Desktop**: Full-featured interface with expanded data visualization
- **Large Screens**: Optimized layouts that prevent content from becoming too sparse

## 🔐 Authentication & Authorization

The application implements a secure authentication flow using Firebase:

- Google OAuth integration
- Role-based authorization
- Protected routes for authenticated users
- Secure data access patterns

## 🚀 Performance Optimizations

StudentTrackr is optimized for performance through:

- Component code-splitting
- Efficient data fetching with React Query
- Memoization of expensive calculations
- Lazy-loading of routes and components
- Optimized bundle size

## 📐 Architecture

The project follows a well-structured architecture:

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and services
├── pages/             # Page components with routing
└── types/             # TypeScript definitions
```

## 🛠️ Running Locally

To run this project locally:

1. Clone the repository
   ```bash
   git clone https://github.com/santhossiva2002/studentTrackr.git
   cd studenttrackr
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser


## 🔮 Future Enhancements

- Advanced analytics dashboard with performance insights
- Student attendance tracking with calendar integration
- Notification system for important academic events
- Parent portal for guardians to monitor student progress
- Dark mode theme support
- Export functionality for reports and student data


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
