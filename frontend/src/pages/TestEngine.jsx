


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getQuestionsByTest,
  getTestById,
  submitTest
} from "../services/test.service";

const TestEngine = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const [violations, setViolations] = useState({
    tabSwitch: 0,
    blur: 0,
    copy: 0,
    rightClick: 0
  });

  // 🔥 FETCH
  useEffect(() => {
    const fetchData = async () => {
      const [qRes, tRes] = await Promise.all([
        getQuestionsByTest(testId),
        getTestById(testId)
      ]);

      setQuestions(qRes.data || []);
      setTest(tRes.data);

      const saved = localStorage.getItem(`test-${testId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setMarked(parsed.marked || {});
        setCurrent(parsed.current || 0);
        setTimeLeft(parsed.timeLeft || tRes.data.duration * 60);
      } else {
        setTimeLeft(tRes.data.duration * 60);
      }

      setLoading(false);
    };

    fetchData();
  }, [testId]);

  // 🔥 FULLSCREEN ONLY HERE
  useEffect(() => {
    document.documentElement.requestFullscreen?.();

    return () => {
      document.exitFullscreen?.();
    };
  }, []);

  // 🔒 ANTI-CHEAT
  useEffect(() => {
    const blockCopy = (e) => {
      e.preventDefault();
      setViolations(v => ({ ...v, copy: v.copy + 1 }));
    };

    const blockRightClick = (e) => {
      e.preventDefault();
      setViolations(v => ({ ...v, rightClick: v.rightClick + 1 }));
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setViolations(v => ({ ...v, tabSwitch: v.tabSwitch + 1 }));
      }
    };

    const handleBlur = () => {
      setViolations(v => ({ ...v, blur: v.blur + 1 }));
    };

    document.addEventListener("copy", blockCopy);
    document.addEventListener("contextmenu", blockRightClick);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("contextmenu", blockRightClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // 🔥 TIMER
  useEffect(() => {
    if (!timeLeft || !test) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, test]);

  // SAVE STATE
  useEffect(() => {
    localStorage.setItem(
      `test-${testId}`,
      JSON.stringify({ answers, marked, timeLeft, current })
    );
  }, [answers, marked, timeLeft, current]);

  // ACTIONS
  const handleAnswer = (qid, index) => {
    setAnswers(prev => ({ ...prev, [qid]: index }));
  };

  const handleSaveNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    }
  };

  const toggleMark = (qid) => {
    setMarked(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  // const handleSubmit = async () => {
  //   const res = await submitTest({
  //     testId,
  //     answers,
  //     timeTaken: (test.duration * 60) - timeLeft,
  //     violations
  //   });

  //   localStorage.removeItem(`test-${testId}`);
  //   navigate(`/result/${res.data.attemptId}`);
  // };


    const handleSubmit = async () => {
    const res = await submitTest({
      testId,
      answers,
      timeTaken: (test.duration * 60) - timeLeft,
      violations
    });

    localStorage.removeItem(`test-${testId}`);
    navigate(`/result/${res.data.attemptId}`);
  };

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredQuestions = questions.filter((q) => {
    if (filter === "answered") return answers[q._id] !== undefined;
    if (filter === "unanswered") return answers[q._id] === undefined;
    if (filter === "marked") return marked[q._id];
    return true;
  });

  if (loading) return <p className="p-6">Loading...</p>;

  const q = questions[current];

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between p-4 bg-white shadow">
        <h2>Q {current + 1}/{questions.length}</h2>
        <div className="bg-black text-white px-3 py-1 rounded">
          ⏱ {formatTime()}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white p-5 rounded shadow">
            <p className="mb-4">{q?.question?.en}</p>

            {q.options.map((opt, i) => (
              <label
                key={opt._id}
                className={`block border p-3 mb-2 rounded cursor-pointer
                ${answers[q._id] === i ? "bg-indigo-100 border-indigo-500" : ""}
              `}
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

        {/* RIGHT PANEL */}
        <div className="w-72 bg-white border-l p-4 overflow-y-auto hidden md:block">

          <h3 className="font-semibold mb-3">Questions</h3>

          {/* FILTER */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {["all", "answered", "unanswered", "marked"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-2 py-1 rounded ${
                  filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* PALETTE */}
          <div className="grid grid-cols-5 gap-2">
            {filteredQuestions.map((item) => {
              const index = questions.findIndex(q => q._id === item._id);

              return (
                <button
                  key={item._id}
                  onClick={() => setCurrent(index)}
                  className={`w-10 h-10 rounded text-sm
                    ${answers[item._id] !== undefined ? "bg-green-500 text-white" : "bg-gray-300"}
                    ${marked[item._id] ? "border-2 border-yellow-500" : ""}
                    ${current === index ? "ring-2 ring-black" : ""}
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between">

        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => toggleMark(q._id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Mark
        </button>

        <button
          onClick={handleSaveNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Save & Next
        </button>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h3 className="mb-4 font-bold">Submit Test?</h3>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
                Yes
              </button>
              <button onClick={() => setShowSubmitModal(false)} className="bg-gray-400 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TestEngine;