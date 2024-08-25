import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faTrash, faLink } from '@fortawesome/free-solid-svg-icons';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('*');
  
    console.log('Fetched data:', data); 
  
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCreators(data);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      alert('Content creator deleted successfully!');
      fetchCreators();
    }
  };

  return (
    <div>
      <div className="header-buttons">
        <a href="/" className="button">View All Creators</a>
        <a href="/new" className="button">Add a Creator</a>
      </div>
      {creators.length > 0 ? (
        creators.map(creator => (
          <div key={creator.id} className="creator-card">
            <h2>{creator.name}</h2>
            <img src={creator.imageURL} alt={creator.name} />
            <p>{creator.description}</p>
            <div className="social-links">
              {creator.instagram && (
                <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              )}
              {creator.youtube && (
                <a href={creator.youtube} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
              )}
              {creator.tiktok && (
                <a href={creator.tiktok} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTiktok} size="2x" />
                </a>
              )}
            </div>
            <div className="buttons-container">
              <a href={creator.url} target="_blank" rel="noopener noreferrer">
                <button><FontAwesomeIcon icon={faLink} /> Visit Channel</button>
              </a>
              <button onClick={() => handleDelete(creator.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
              <a href={`/edit/${creator.id}`}>
                <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>No content creators found.</p>
      )}
    </div>
  );
};

export default ShowCreators;










