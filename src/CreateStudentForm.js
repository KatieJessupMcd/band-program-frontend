import React, { useState, Component } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

function CreateStudentForm() {
  const { loading, error, data } = useQuery(GET_SCHOOLS_AND_STUDENTS);
  const [createStudent, newStudent] = useMutation(CREATE_STUDENT);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState(4);
  const [instrumentTypeId, setinstrumentTypeId] = useState(0);
  const [schoolId, setschoolId] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const onSubmit = (input) => {
    console.log('this is the input we are passing in', input);
    createStudent({
      variables: {
        firstName: input.firstName,
        lastName: input.lastName,
        grade: input.grade,
        instrumentTypeId: input.instrumentTypeId,
        schoolId: input.schoolId,
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

  return data.schools.map(({ id, name, students }) => (
    <div key={id}>
      <h2>{name}</h2>
      <ul key={id}>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName} {student.id}
          </li>
        ))}
      </ul>
      <form id={id} onSubmit={handleSubmit}>
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
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  ));
}

export default CreateStudentForm;
