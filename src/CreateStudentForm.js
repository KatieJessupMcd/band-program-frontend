import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const GET_STUDENTS_FOR_SCHOOL = gql`
  query getSchool($id: ID!) {
    school(id: $id) {
      name
      lowestGrade
      highestGrade
      students {
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

function CreateStudentForm() {
  const { schoolId } = useParams();
  let navigate = useNavigate();

  const [createStudent, newStudent] = useMutation(CREATE_STUDENT, {
    refetchQueries: [GET_STUDENTS_FOR_SCHOOL, 'getSchool'],
    onCompleted: () => {
      navigate(`/schools/${id}/students`, {
        replace: true,
        state: { isSuccess: true },
      });
    },
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState(4);
  const [instrumentTypeId, setinstrumentTypeId] = useState(1);
  const [id, setschoolId] = useState(schoolId);

  const onSubmit = (input) => {
    createStudent({
      variables: {
        firstName: firstName,
        lastName: lastName,
        grade: parseInt(grade),
        instrumentTypeId: instrumentTypeId,
        schoolId: parseInt(id),
      },
    });
    setFirstName('');
    setLastName('');
    setGrade('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ firstName, lastName, grade, instrumentTypeId, schoolId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Grade:
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default CreateStudentForm;
