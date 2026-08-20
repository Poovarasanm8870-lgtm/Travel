import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RideProvider } from './context/RideContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Rides from './pages/Rides';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookRide from './pages/BookRide';
import RideStatus from './pages/RideStatus';
import MyRides from './pages/MyRides';
import SavedPlaces from './pages/SavedPlaces';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Scroll to top wrapper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RideProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/rides" element={<Rides />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected User Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/book-ride"
                    element={
                      <ProtectedRoute>
                        <BookRide />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ride-status"
                    element={
                      <ProtectedRoute>
                        <RideStatus />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-rides"
                    element={
                      <ProtectedRoute>
                        <MyRides />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-places"
                    element={
                      <ProtectedRoute>
                        <SavedPlaces />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* Error 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <BottomNav />
            </div>
          </BrowserRouter>
        </RideProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
