import { useEffect, useState } from 'react';
import { supabase } from '../client';


const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');
  
      console.log('Fetched data:', data); // Add this line
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCreators(data);
      }
    };
  
    fetchCreators();
  }, []);
  
  if (creators.length === 0) {
    return <p>No content creators found.</p>;
  }

  return (
    <div>
      {creators.map(creator => (
        <div key={creator.id}>
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit</a>
          <img src={creator.imageURL} alt={creator.name} />
        </div>
      ))}
    </div>
  );
};

export default ShowCreators;
