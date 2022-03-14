import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
} from 'react-router-dom';

const GET_SCHOOLS = gql`
  query getSchools {
    schools {
      id
      name
    }
  }
`;

const GET_SCHOOL = gql`
  query getSchool($id: ID!) {
    school(id: $id) {
      name
    }
  }
`;

export default function SchoolsView() {
  const { loading, error, data } = useQuery(GET_SCHOOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Schools</h1>
      <div>
        {data.schools.map(({ id, name }) => {
          return (
            <Link to={`/schools/${id}`}>
              <div key={id}>
                <h2>{name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
