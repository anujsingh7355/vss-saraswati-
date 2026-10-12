import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FacultyPage } from './pages/FacultyPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { NoticeBoardPage } from './pages/NoticeBoardPage';
import { EventsPage } from './pages/EventsPage';
import { ResultsPage } from './pages/ResultsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/notices" element={<NoticeBoardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
