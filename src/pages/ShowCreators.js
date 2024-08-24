import { useEffect, useState } from 'react';
import { supabase } from '../client';


const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('name, url, description, imageURL');
  
      console.log('Fetched data:', data); 
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCreators(data);
      }
    };
  
    fetchCreators();
  }, []);
  
//   if (creators.length === 0) {
//     return <p>No content creators found.</p>;
//   }

  return (
    <div>
            {creators.length > 0 ? (
                creators.map(creator => (
                    <div key={creator.id}>
                        <h2>{creator.name}</h2>
                        <p>{creator.description}</p>
                        <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
                    </div>
                ))
            ) : (
                <p>No content creators found</p>
            )}
        </div>
  );
};

export default ShowCreators;
