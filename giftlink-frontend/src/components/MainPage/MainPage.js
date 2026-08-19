import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig}/api/gifts`);

                if (!response.ok) {
                    throw new Error('Failed to fetch gifts');
                }

                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error('Error fetching gifts:', error);
            }
        };

        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/details/${productId}`);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) {
            return '';
        }

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            return '';
        }

        return date.toLocaleDateString();
    };

    const getConditionClass = (condition) => {
        return condition === "New"
            ? "list-group-item-success"
            : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">

                            {/* Task 4: Display gift image or placeholder */}
                            <img
                                src={gift.image || '/placeholder.jpg'}
                                className="card-img-top"
                                alt={gift.name || 'Gift'}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />

                            <div className="card-body">

                                {/* Task 5: Display gift name */}
                                <h5 className="card-title">
                                    {gift.name}
                                </h5>

                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    {gift.condition}
                                </p>

                                {/* Task 6: Display gift details */}
                                <p className="card-text">
                                    {gift.description}
                                </p>

                                <p className="card-text">
                                    <small className="text-muted">
                                        {formatDate(gift.createdAt)}
                                    </small>
                                </p>

                                <button
                                    onClick={() => goToDetailsPage(gift.id)}
                                    className="btn btn-primary"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;