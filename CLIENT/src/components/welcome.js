import React from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { GET_STORES } from '../utils/queries';

function Welcome() {
  const { loading, data } = useQuery(GET_STORES);

  if (loading) {
    return <div>Loading...</div>;
  }

  const stores = data?.stores;
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h2>Stores:</h2>
      <ul>
        {stores?.map(store => (
          <li key={store._id}>
            {/* <Link to={`/login/${store._id}`}>{store.name}</Link> */}
            {store.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Welcome;