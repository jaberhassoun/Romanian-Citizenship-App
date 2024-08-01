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
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    };

    const handleSpeak = () => {
        if (!data) return;
        const question = data.root.questions[currentIndex];
        const answer = data.root.answers[currentIndex];
        // speaking aloud: question and answer
        speak(`${question}`); 
        //speak(``); 
        speak(`${answer}`);
    };

    const getImagePath = (imageFileName: string) => {
        return imageFileName ? `src/assets/images/${imageFileName}` : '';
    };

    return (

<div className="container">
            {data ? (
                <>
                    <div className="question-nav-container"> {/* Flex container */}
                        <button onClick={handlePrevious} className="circular nav-button">
                            👈
                        </button>
                        <h2 className="question">{data.root.questions[currentIndex]}</h2>
                        <button onClick={handleNext} className="circular nav-button">
                            👉
                        </button>
                    </div>
                    <p className="answer">{data.root.answers[currentIndex]}</p>
                    {data.root.images[currentIndex] && (
                        <img src={getImagePath(data.root.images[currentIndex])} alt="Related"/>
                    )}
                    <button onClick={handleSpeak} className="speak-button">
                        Read aloud 🗣
                    </button>
                </>
            ) : (
                <p>Loading data...</p>
            )}
        </div>

    );
};

export default QAIterator;