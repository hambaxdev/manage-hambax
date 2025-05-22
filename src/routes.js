import React, { lazy } from 'react';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components
const Dashboard = lazy(() => import('./externals/dashboard/Dashboard'));
const Events = lazy(() => import('./pages/Events'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPasswordScreen = lazy(() => import('./pages/ForgotPasswordScreen'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CompleteRegistrationPage = lazy(() => import('./pages/CompleteRegistrationPage'));
const CreateEventPage = lazy(() => import('./pages/CreateEventPage'));
const EventEditPage = lazy(() => import('./pages/EventEditPage'));
const ScanQRPage = lazy(() => import('./pages/ScanQRPage'));
const EmailVerificationNotice = lazy(() => import('./pages/EmailVerificationNotice'));
const ResendVerificationPage = lazy(() => import('./pages/ResendVerificationPage'));
const OnboardingRefresh = lazy(() => import('./pages/OnboardingRefresh'));
const OnboardingSuccess = lazy(() => import('./pages/OnboardingSuccess'));
const CreateTicketPage = lazy(() => import('./pages/CreateTicketPage'));
const PayoutsPage = lazy(() => import('./pages/PayoutsPage'));
const StaffManagementPage = lazy(() => import('./pages/StaffManagementPage'));
const SetStaffPasswordPage = lazy(() => import('./pages/SetStaffPasswordPage'));
const StaffDashboard = lazy(() => import('./pages/StaffDashboard'));

// Public routes
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
    wrapper: PublicRoute
  },
  {
    path: '/register',
    element: <RegisterPage />,
    wrapper: PublicRoute
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordScreen />,
    wrapper: PublicRoute
  },
  {
    path: '/email-verification',
    element: <EmailVerificationNotice />,
    wrapper: PublicRoute
  },
  {
    path: '/resend-verification',
    element: <ResendVerificationPage />,
    wrapper: PublicRoute
  },
  {
    path: '/staff/set-password',
    element: <SetStaffPasswordPage />,
    wrapper: PublicRoute
  }
];

// Protected routes
export const protectedRoutes = [
  {
    path: '/',
    element: <Dashboard />,
    wrapper: ProtectedRoute
  },
  {
    path: '/events',
    element: <Events />,
    wrapper: ProtectedRoute
  },
  {
    path: '/profile',
    element: <Profile />,
    wrapper: ProtectedRoute
  },
  {
    path: '/create-event',
    element: <CreateEventPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/events/:id',
    element: <EventEditPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/events/:id/create-ticket',
    element: <CreateTicketPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/scan-qr',
    element: <ScanQRPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/complete-registration',
    element: <CompleteRegistrationPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/onboarding/refresh',
    element: <OnboardingRefresh />,
    wrapper: ProtectedRoute
  },
  {
    path: '/onboarding/success',
    element: <OnboardingSuccess />,
    wrapper: ProtectedRoute
  },
  {
    path: '/payouts',
    element: <PayoutsPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/staff',
    element: <StaffManagementPage />,
    wrapper: ProtectedRoute
  },
  {
    path: '/staff-dashboard',
    element: <StaffDashboard />,
    wrapper: ProtectedRoute
  }
];

// All routes combined
export const allRoutes = [...publicRoutes, ...protectedRoutes];

// Auth routes for checking if current page is an auth page
export const authRoutes = ['/login', '/register', '/forgot-password'];