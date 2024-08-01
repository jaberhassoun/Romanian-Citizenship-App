import React, { useState, useEffect } from 'react';

// Define the interface for your question-answer pairs
interface QuestionAnswer {
    question: string;
    answer: string;
}

const QAIterator = () => {
    const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch the questions and answers from the JSON file in the public/assets folder
        fetch('src/assets/Geography.json')
            .then(response => response.json())
            .then(data => setQuestionsAnswers(data as QuestionAnswer[]))
            .catch(error => console.error('Error fetching questions and answers:', error));
    }, []);

    const handleNext = () => {
        // Increment currentIndex, but not beyond the array length
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questionsAnswers.length - 1));
    };

    const handlePrevious = () => {
        // Decrement currentIndex, but not below 0
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <div>
            {questionsAnswers.length > 0 ? (
                <>
                    <div>
                        <h2>Question:</h2>
                        <p>{questionsAnswers[currentIndex].question}</p>
                        <h2>Answer:</h2>
                        <p>{questionsAnswers[currentIndex].answer}</p>
                    </div>
                    <button onClick={handlePrevious} disabled={currentIndex === 0}>
                        Previous
                    </button>
                    <button onClick={handleNext} disabled={currentIndex === questionsAnswers.length - 1}>
                        Next
                    </button>
                </>
            ) : (
                <p>Loading questions and answers...</p>
            )}
        </div>
    );
};

export default QAIterator;
