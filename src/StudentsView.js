import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

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

export default function StudentsView() {
  const { schoolId } = useParams();
  const { loading, error, data } = useQuery(GET_STUDENTS_FOR_SCHOOL, {
    variables: { id: schoolId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errror :(</p>;

  return (
    <>
      <div>
        <h1>{data.school.name}: Students</h1>
        <div key={data.school.id}>
          <Link to="new">Add new student</Link>
          {data.school.students.map((student) => {
            return (
              <div>
                <span>{student.firstName}</span> <span>{student.lastName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
