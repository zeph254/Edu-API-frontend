import React from 'react'
import Nopage from './pages/Nopage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import StudentPerformance from './pages/StudentPerformance'
import ResetPassword from './pages/ResetPassword'
import MyTimetable from './pages/MyTimetable'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import SchoolTimetable from './pages/SchoolTimetable'
import SchoolSettings from './pages/SchoolSettings'
import TeacherDashboard from './pages/TeacherDashboard'
import TimetableEditing from './pages/TimetableEditing'
import HeadTeactherDashboard from './pages/HeadTeactherDashboard'
import Home from './pages/Home'
import './App.css'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>} /> 
        <Route path="register" element={<Register/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path="reset-password" element={<ResetPassword/>} />
        <Route path="school-timetable" element={<SchoolTimetable/>} />
        <Route path="timetable-editing" element={<TimetableEditing/>} />
        <Route path="student-performance" element={<StudentPerformance/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="school-settings" element={<SchoolSettings/>} />
        <Route path="my-timetable" element={<MyTimetable/>} />
        <Route path="analytics" element={<Analytics/>} />
        <Route path="teacher-dashboard" element={<TeacherDashboard/>} />
        <Route path="head-teacher-dashboard" element={<HeadTeactherDashboard/>} />
        <Route path="*" element={<Nopage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
