import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SchoolsView from './SchoolsView';
import SchoolView from './SchoolView';
import StudentsView from './StudentsView';
import CreateStudentForm from './CreateStudentForm';

function App() {
  return (
    <Routes>
      <Route path="/schools" element={<SchoolsView />}></Route>
      <Route path="schools/:schoolId" element={<SchoolView />}></Route>
      <Route
        path="schools/:schoolId/students"
        element={<StudentsView />}
      ></Route>
      <Route
        path="schools/:schoolId/students/new"
        element={<CreateStudentForm />}
      ></Route>
    </Routes>
  );
}

export default App;
