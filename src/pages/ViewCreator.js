import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewCreator = ({ creator }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!creator) {
        return <p>Content creator not found.</p>;
    }

    return (
        <div className="view-creator">
            <h2>{creator.name}</h2>
            <img src={creator.imageURL} alt={creator.name} />
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        </div>
    );
};

export default ViewCreator;
