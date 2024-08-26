import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../viewCreator.css';

const ViewCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
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

    const handleDelete = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            alert('Content creator deleted successfully!');
            navigate('/');
        }
    };

    if (!creator) {
        return <p>{error || 'Loading content creator...'}</p>;
    }

    return (
        <div className="view-creator">
            <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h2>{creator.name}</h2>
            <img src={creator.imageURL} alt={creator.name} style={{ width: '500px', height: '500px', borderRadius: '50%' }} />
            <p>{creator.description}</p>
            
            <div className="buttons-container">
                <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                <button onClick={() => navigate(`/edit/${id}`)}><FontAwesomeIcon icon={faEdit} /> Edit</button>
                <a href={creator.url} target="_blank" rel="noopener noreferrer" className="visit-channel-link">Visit Channel</a>
            </div>
        </div>
    );
};

export default ViewCreator;
