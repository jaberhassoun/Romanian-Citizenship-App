//const response = await fetch(`src/assets/${selectedCategory}.json`);
import React, { useState, useEffect } from 'react';
//import 'src/QAStyles.css'; // Adjust the path as necessary
import './App.css';


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
    const questionsCount = data?.root.questions.length ?? 0;

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % questionsCount);
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + questionsCount) % questionsCount);
    };


    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ro-RO'; // Set the language to Romanian
        speechSynthesis.speak(utterance);
    };

    const handleSpeak = () => {
        if (!data) return;
        const question = data.root.questions[currentIndex] + "          ";
        const answer = data.root.answers[currentIndex];
        speak(`${question} ${answer}`); // Combine question and answer for speaking
    };

    const getImagePath = (imageFileName: string) => {
        return imageFileName ? `src/assets/images/${imageFileName}` : '';
    };

    return (

// Inside your return statement

<div className="container">
    {data ? (
        <>
            <div className="question">
                <h2>Question:</h2>
                <p>{data.root.questions[currentIndex]}</p>
            </div>
            <div className="answer">
                <h2>Answer:</h2>
                <p>{data.root.answers[currentIndex]}</p>
            </div>
            {data.root.images[currentIndex] && (
                <div className="img-container">
                    <img src={getImagePath(data.root.images[currentIndex])} alt="Related" />
                </div>
            )}
            <div className="button-container">
            <button onClick={handlePrevious} className="circular">←---</button>
                <button onClick={handleNext} className="circular">---→</button>
            </div>
            <button onClick={handleSpeak} className="speak">Speak</button>
        </>
    ) : (
        <p>Loading data...</p>
    )}
</div>


    );
};

export default QAIterator;