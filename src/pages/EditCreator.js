import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {supabase} from '../client';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL);
            }
            setLoading(false);
        };

        fetchCreator();
    }, [id]);

    const handleUpdate = async () => {
        const { error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id);

        if (error) {
            console.error('Error updating creator:', error);
        } else {
            navigate('/');
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-creator">
            <h2>Edit {name}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={imageURL} 
                    onChange={(e) => setImageURL(e.target.value)} 
                />
                <button type="submit">Update Creator</button>
            </form>
            <button onClick={handleDelete}>Delete Creator</button>
        </div>
    );
};

export default EditCreator;
