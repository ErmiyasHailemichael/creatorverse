import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../client';

const AddCreator = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    const handleAdd = async () => {
        const { data, error } = await supabase
            .from('creators')
            .insert([{ name, url, description, imageURL }]);

        if (error) {
            console.error('Error adding creator:', error);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="add-creator">
            <h2>Add New Creator</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="URL" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={imageURL} 
                    onChange={(e) => setImageURL(e.target.value)} 
                />
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;
