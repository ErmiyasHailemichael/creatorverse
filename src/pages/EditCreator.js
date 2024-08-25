import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import '../editCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Error fetching creator data');
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL
      })
      .eq('id', id);

    if (error) {
      setError('Error updating creator');
      console.error('Error updating creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="edit-creator">
    <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>Edit Creator</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={creator.name} onChange={handleChange} />
        </label>
        <label>
          URL:
          <input type="text" name="url" value={creator.url} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={creator.description} onChange={handleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} />
        </label>
        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
};

export default EditCreator;





