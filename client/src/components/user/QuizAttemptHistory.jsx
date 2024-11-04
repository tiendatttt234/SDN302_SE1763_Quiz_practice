import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/QuizResult.css";

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
                <table className="quiz-results-table">
                    <thead>
                        <tr>
                            
                            <th>Question File Name</th>
                            <th>Correct Answers</th>
                            <th>Incorrect Answers</th>
                            <th>Submission Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.quizId}>
                                
                                <td>{result.questionFileName}</td>
                                <td>{result.correctAnswersCount}</td>
                                <td>{result.incorrectAnswersCount}</td>
                                <td>{new Date(result.createdAt).toLocaleString()}</td>
                                <td>detail</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QuizAttemptHistory;
