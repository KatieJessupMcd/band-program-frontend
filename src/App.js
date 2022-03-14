import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import SchoolsView from './SchoolsView';
import SchoolView from './SchoolView';
import StudentsView from './StudentsView';

const GET_SCHOOLS_AND_STUDENTS = gql`
  query getSchools {
    schools {
      name
      students {
        id
        firstName
        lastName
        grade
      }
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation CreateStudent(
    $firstName: String!
    $lastName: String!
    $grade: Int!
    $instrumentTypeId: Int!
    $schoolId: Int!
  ) {
    createStudent(
      input: {
        firstName: $firstName
        lastName: $lastName
        grade: $grade
        instrumentTypeId: $instrumentTypeId
        schoolId: $schoolId
      }
    ) {
      student {
        id
        firstName
        lastName
        grade
      }
      errors
    }
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/schools" element={<SchoolsView />}></Route>
        <Route path="schools/:schoolId" element={<SchoolView />}></Route>
        <Route
          path="schools/:schoolId/students"
          element={<StudentsView />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
