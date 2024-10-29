import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/QuizResult.css"
const QuizAttemptHistory = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch quiz results when the component mounts
    useEffect(() => {
        const fetchQuizResults = async () => {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

            // Check if userId exists
            if (!userId) {
                setError(new Error("User ID not found in local storage"));
                setLoading(false);
                return;
            }

            try {
                // Updated API endpoint
                const response = await axios.post('http://localhost:9999/quizSubmit/getAllByUserId', {
                    userId: userId // Use retrieved userId in request body
                });
                setResults(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizResults();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching results: {error.message}</div>;

    return (
        <div>
            <h1>Quiz Results</h1>
            {results.length === 0 ? (
                <p>No quiz results available.</p>
            ) : (
                results.map((result) => (
                    <div key={result.quizId} className="quiz-result">
                        <h2>{result.questionFileName}</h2>
                        <p>Quiz ID: {result.quizId}</p>
                        <p>Correct Answers: {result.correctAnswersCount}</p>
                        <p>Incorrect Answers: {result.incorrectAnswersCount}</p>
                        <p>Submission Time: {new Date(result.createdAt).toLocaleString()}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default QuizAttemptHistory;
