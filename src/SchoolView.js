import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, NavLink } from 'react-router-dom';

const GET_SCHOOL = gql`
  query getSchool($id: ID!) {
    school(id: $id) {
      name
      lowestGrade
      highestGrade
    }
  }
`;

export default function SchoolView() {
  const { schoolId } = useParams();
  const { loading, error, data } = useQuery(GET_SCHOOL, {
    variables: { id: schoolId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errror :(</p>;

  return (
    <div>
      <h1>Main Dashboard for {data.school.name}</h1>
      <nav>
        <NavLink to="students">Students</NavLink>
      </nav>
      <div key={data.school.id}>
        <h2>{data.school.name}</h2>
        <span>{data.school.lowestGrade}</span> -{' '}
        <span>{data.school.highestGrade}</span>
      </div>
    </div>
  );
}
