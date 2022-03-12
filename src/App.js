import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_SCHOOLS_AND_STUDENTS = gql`
  query getSchools {
    schools {
      name
      students {
        firstName
        lastName
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_SCHOOLS_AND_STUDENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.schools.map(({ id, name, students }) => (
    <div key={id}>
      <h2>{name}</h2>
      {students.map((student) => (
        <ul>
          <li>
            {student.firstName} {student.lastName}
          </li>
        </ul>
      ))}
    </div>
  ));
}

export default App;
