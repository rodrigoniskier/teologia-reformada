import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CourseCatalog } from './components/Public/CourseCatalog';
import { CourseViewer } from './components/Public/CourseViewer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin}>
        <Routes>
          <Route path="/" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseViewer />} />
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;