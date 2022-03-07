import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_SCHOOLS = gql`
  query getSchools {
    schools {
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_SCHOOLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.schools.map(({ id, name }) => (
    <div key={id}>
      <p>{name}</p>
    </div>
  ));
}

export default App;
