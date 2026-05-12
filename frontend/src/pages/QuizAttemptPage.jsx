import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getQuizById
} from "../services/dailyQuiz.service";

const QuizAttemptPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  const [answers, setAnswers] = useState({});

  useEffect(() => {

    fetchQuiz();

  }, []);

  const fetchQuiz = async () => {

    const res = await getQuizById(id);

    setQuiz(res.data);
  };

  const handleSubmit = () => {

    let score = 0;

    quiz.questions.forEach((q, i) => {

      if (
        answers[i] === q.correctAnswer
      ) {
        score++;
      }
    });

    navigate("/daily-result", {
      state: {
        score,
        total: quiz.questions.length
      }
    });
  };

  if (!quiz)
    return <p>Loading...</p>;

  return (
    <div className="p-6">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          {quiz.title}
        </h1>

        {quiz.questions.map((q, i) => (

          <div
            key={i}
            className="mb-8"
          >

            <h2 className="font-semibold mb-3">
              Q{i + 1}. {q.question}
            </h2>

            <div className="space-y-2">

              {q.options.map((opt, idx) => (

                <button
                  key={idx}
                  onClick={() =>
                    setAnswers({
                      ...answers,
                      [i]: opt
                    })
                  }
                  className={`w-full text-left border p-3 rounded-xl ${
                    answers[i] === opt
                      ? "bg-indigo-100 border-indigo-500"
                      : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Submit Quiz
        </button>

      </div>
    </div>
  );
};

export default QuizAttemptPage;