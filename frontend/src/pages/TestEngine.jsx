


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  getQuestionsByTest,
  getTestById,
  submitTest
} from "../services/test.service";

const TestEngine = () => {
  const { testId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [marked, setMarked] = useState({});

  const navigate = useNavigate();

  // ✅ FETCH QUESTIONS + TEST
  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await getQuestionsByTest(testId);
        const tRes = await getTestById(testId);

        setQuestions(qRes.data);
        setTest(tRes.data);

        // 🔥 SET TIMER FROM DB (minutes → seconds)
        setTimeLeft(tRes.data.duration * 60);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [testId]);

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getQuestionsByTest(testId);
      setQuestions(res.data);
    };
    fetchQuestions();
  }, [testId]);

  // 🔥 SAVE STATE
  useEffect(() => {
    localStorage.setItem(
      `test-${testId}`,
      JSON.stringify({ answers, marked, timeLeft, current })
    );
  }, [answers, marked, timeLeft, current]);

  // 🔥 TIMER
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

useEffect(() => {
  if (!timeLeft) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        handleSubmit();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

//   const formatTime = () => {
//     const m = Math.floor(timeLeft / 60);
//     const s = timeLeft % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

const formatTime = () => {
  const hr = Math.floor(timeLeft / 3600);
  const min = Math.floor((timeLeft % 3600) / 60);
  const sec = timeLeft % 60;

  return `${hr > 0 ? hr + ":" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
};

  // ✅ ANSWER SELECT
  const handleAnswer = (qid, index) => {
    setAnswers({ ...answers, [qid]: index });
  };

  // ✅ MARK FOR REVIEW
  const toggleMark = (qid) => {
    setMarked({ ...marked, [qid]: !marked[qid] });
  };

  // NAV
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // ✅ RESULT CALCULATION
  const calculateResult = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;

    questions.forEach((q) => {
      const selected = answers[q._id];
      const correctIndex = q.options.findIndex((o) => o.isCorrect);

      if (selected === correctIndex) {
        score += q.marks;
        correct++;
      } else if (selected !== undefined) {
        score -= q.negativeMarks;
        wrong++;
      }
    });

    return { score, correct, wrong };
  };

  // ✅ SUBMIT


const handleSubmit = async () => {
  try {
    const res = await submitTest({
      testId,
      answers,
      timeTaken: (test.duration * 60) - timeLeft
    });

    navigate(`/result/${res.data.attemptId}`);

  } catch (err) {
    console.error(err);
  }
};

  const q = questions[current];
  if (!q) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">

      {/* LEFT */}
      <div className="md:w-3/4 w-full p-4 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-sm md:text-lg">
            Q {current + 1}/{questions.length}
          </h2>

          <div className="bg-black text-white px-3 py-1 rounded text-sm">
            ⏱ {formatTime()}
          </div>
        </div>

        {/* QUESTION */}
        <div className="bg-white p-4 rounded shadow mb-3">
          <p className="font-medium mb-3">{q.question?.en}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label
                key={opt._id}
                className={`block border p-2 rounded cursor-pointer ${
                  answers[q._id] === i
                    ? "bg-blue-100 border-blue-500"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  checked={answers[q._id] === i}
                  onChange={() => handleAnswer(q._id, i)}
                />
                <span className="ml-2">{opt.text?.en}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2 justify-between mt-auto">

          <button
            onClick={handlePrev}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Prev
          </button>

          <button
            onClick={() => toggleMark(q._id)}
            className={`px-4 py-2 rounded ${
              marked[q._id] ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            ⭐ Mark
          </button>

          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save & Next
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="md:w-1/4 w-full bg-white p-4 border-t md:border-l overflow-y-auto">

        <h3 className="font-semibold mb-3">Palette</h3>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((item, i) => {
            const isAnswered = answers[item._id] !== undefined;
            const isMarked = marked[item._id];

            return (
              <button
                key={item._id}
                onClick={() => setCurrent(i)}
                className={`w-10 h-10 rounded text-sm
                  ${isAnswered ? "bg-green-500 text-white" : "bg-gray-300"}
                  ${isMarked ? "border-2 border-yellow-500" : ""}
                  ${current === i ? "ring-2 ring-black" : ""}
                `}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="mt-4 text-xs space-y-1">
          <p><span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>Answered</p>
          <p><span className="inline-block w-3 h-3 bg-gray-300 mr-2"></span>Not Answered</p>
          <p><span className="inline-block w-3 h-3 border-2 border-yellow-500 mr-2"></span>Marked</p>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;