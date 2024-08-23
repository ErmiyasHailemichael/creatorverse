import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatorCard = ({ id, name, url, description, imageURL }) => {
    const navigate = useNavigate();

    return (
        <div className="creator-card">
            <img src={imageURL} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        </div>
    );
};

export default CreatorCard;
