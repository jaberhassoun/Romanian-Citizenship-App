//const response = await fetch(`src/assets/${selectedCategory}.json`);
import React, { useState, useEffect } from 'react';

interface QAData {
    root: {
        questions: string[];
        images: string[];
        answers: string[];
    };
}

interface QAIteratorProps {
    selectedCategory: string;
}

const QAIterator: React.FC<QAIteratorProps> = ({ selectedCategory }) => {
    const [data, setData] = useState<QAData | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`src/assets/${selectedCategory}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData as QAData);
                setCurrentIndex(0); // Reset index when category changes
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedCategory]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data?.root.questions.length ?? 0 - 1));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const getImagePath = (imageFileName: string) => {
        return imageFileName ? `src/assets/images/${imageFileName}` : '';
    };

    return (
        <div>
            {data ? (
                <>
                    <div>
                        <h2>Question:</h2>
                        <p>{data.root.questions[currentIndex]}</p>
                        <h2>Answer:</h2>
                        <p>{data.root.answers[currentIndex]}</p>
                        {/* Check if the image path is not empty and display the image */}
                        {data.root.images[currentIndex] && (
                            <img src={getImagePath(data.root.images[currentIndex])} alt="Related" style={{ marginTop: '20px' }} />
                        )}
                    </div>
                    <button onClick={handlePrevious} disabled={currentIndex === 0}>
                        Previous
                    </button>
                    <button onClick={handleNext} disabled={currentIndex === (data?.root.questions.length ?? 0) - 1}>
                        Next
                    </button>
                </>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default QAIterator;
