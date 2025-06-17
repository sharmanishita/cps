import { Request, Response } from 'express';
import Concept from '../models/conceptModel';
import User from '../models/userModel';

/**
 * @desc    Fetches a quiz for a concept, removing answers before sending to the client.
 * @route   GET /api/quizzes/:conceptId
 * @access  Private
 */
export const getQuizForConcept = async (req: Request, res: Response) => {
    try {
        const concept = await Concept.findById(req.params.conceptId).select('quiz');

        if (!concept || !concept.quiz || concept.quiz.length === 0) {
            return res.status(404).json({ message: 'Quiz not found for this concept.' });
        }

        // IMPORTANT: We must remove the correct answers before sending the quiz.
        const sanitizedQuiz = concept.quiz.map(q => ({
            questionText: q.questionText,
            options: q.options,
            _id: (q as any)._id, // Useful for the frontend to key on
        }));

        res.status(200).json(sanitizedQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Grades a quiz submission and updates the user's learning profile.
 * @route   POST /api/quizzes/submit/:conceptId
 * @access  Private
 */
export const submitQuiz = async (req: Request, res: Response) => {
    try {
        const { conceptId } = req.params;
        const { answers } = req.body; // Expects an array of chosen answer indexes, e.g., [0, 2, 1]

        const concept = await Concept.findById(conceptId).select('quiz');
        if (!concept || !concept.quiz) {
            return res.status(404).json({ message: 'Concept not found.' });
        }

        // --- Grade the submission ---
        let correctCount = 0;
        const results = concept.quiz.map((question, index) => {
            const isCorrect = question.correctAnswerIndex === answers[index];
            if (isCorrect) correctCount++;
            return {
                questionText: question.questionText,
                yourAnswerIndex: answers[index],
                correctAnswerIndex: question.correctAnswerIndex,
                isCorrect,
            };
        });

        const score = correctCount / concept.quiz.length;

        // --- Update user's learning profile ---
        const user = await User.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const profileEntryIndex = user.learningProfile.findIndex(
            item => item.concept.toString() === conceptId
        );
        
        const newAttempt = {
            score: score,
            submittedAnswers: answers,
            attemptedAt: new Date(),
        };

        if (profileEntryIndex > -1) {
            // User has attempted this concept before, add a new attempt
            const entry = user.learningProfile[profileEntryIndex];
            entry.quizAttempts.push(newAttempt);
            // Update masteryLevel to be the highest score they've achieved
            entry.masteryLevel = Math.max(entry.masteryLevel, score);
        } else {
            // This is the user's first attempt for this concept
            user.learningProfile.push({
                concept: concept._id,
                masteryLevel: score,
                quizAttempts: [newAttempt],
            });
        }
        await user.save();

        res.status(200).json({ score, correctCount, totalQuestions: concept.quiz.length, results });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};