import { useState } from "react";
import { createQuiz } from "../../services/dailyQuiz.service";

const AdminQuizPage = () => {

  const [loading, setLoading] = useState(false);

  const [quizData, setQuizData] = useState({
    title: "",
    slug: "",
    date: "",
    duration: 10,
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: ""
      }
    ]
  });



  // 🔥 HANDLE BASIC INPUT
  const handleChange = (e) => {

    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };



  // 🔥 HANDLE QUESTION CHANGE
  const handleQuestionChange = (
    index,
    field,
    value
  ) => {

    const updatedQuestions = [
      ...quizData.questions
    ];

    updatedQuestions[index][field] = value;

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };



  // 🔥 HANDLE OPTION CHANGE
  const handleOptionChange = (
    qIndex,
    oIndex,
    value
  ) => {

    const updatedQuestions = [
      ...quizData.questions
    ];

    updatedQuestions[qIndex]
      .options[oIndex] = value;

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };



  // 🔥 ADD NEW QUESTION
  const addQuestion = () => {

    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: ""
        }
      ]
    });
  };



  // 🔥 REMOVE QUESTION
  const removeQuestion = (index) => {

    const updatedQuestions =
      quizData.questions.filter(
        (_, i) => i !== index
      );

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };



  // 🔥 SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createQuiz(quizData);

      alert("✅ Daily Quiz Created");

      setQuizData({
        title: "",
        slug: "",
        date: "",
        duration: 10,
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            explanation: ""
          }
        ]
      });

    } catch (err) {

      console.error(err);

      alert("❌ Failed to create quiz");

    } finally {

      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Daily Quiz
          </h1>

          <p className="text-gray-500 mt-2">
            Add daily quiz for users
          </p>

        </div>



        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* TITLE */}
          <div>

            <label className="block mb-2 font-semibold">
              Quiz Title
            </label>

            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              placeholder="Daily Current Affairs Quiz"
              className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />

          </div>



          {/* SLUG */}
          <div>

            <label className="block mb-2 font-semibold">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={quizData.slug}
              onChange={handleChange}
              placeholder="daily-current-affairs-quiz"
              className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />

          </div>



          {/* DATE + DURATION */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-semibold">
                Quiz Date
              </label>

              <input
                type="date"
                name="date"
                value={quizData.date}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

            </div>


            <div>

              <label className="block mb-2 font-semibold">
                Duration (Minutes)
              </label>

              <input
                type="number"
                name="duration"
                value={quizData.duration}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

          </div>



          {/* QUESTIONS */}
          <div className="space-y-8">

            {quizData.questions.map(
              (q, qIndex) => (

                <div
                  key={qIndex}
                  className="border rounded-2xl p-6 bg-gray-50"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold">
                      Question {qIndex + 1}
                    </h2>

                    {quizData.questions.length > 1 && (

                      <button
                        type="button"
                        onClick={() =>
                          removeQuestion(qIndex)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Remove
                      </button>
                    )}

                  </div>



                  {/* QUESTION */}
                  <textarea
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        "question",
                        e.target.value
                      )
                    }
                    className="w-full border p-4 rounded-xl mb-6"
                    rows={3}
                    required
                  />



                  {/* OPTIONS */}
                  <div className="grid md:grid-cols-2 gap-4">

                    {q.options.map(
                      (opt, oIndex) => (

                        <input
                          key={oIndex}
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(
                              qIndex,
                              oIndex,
                              e.target.value
                            )
                          }
                          className="border p-4 rounded-xl"
                          required
                        />
                      )
                    )}

                  </div>



                  {/* CORRECT ANSWER */}
                  <div className="mt-6">

                    <label className="block mb-2 font-semibold">
                      Correct Answer
                    </label>

                    <select
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          qIndex,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-xl"
                      required
                    >

                      <option value="">
                        Select Correct Answer
                      </option>

                      {q.options.map(
                        (opt, idx) => (

                          <option
                            key={idx}
                            value={opt}
                          >
                            {opt || `Option ${idx + 1}`}
                          </option>
                        )
                      )}

                    </select>

                  </div>



                  {/* EXPLANATION */}
                  <div className="mt-6">

                    <label className="block mb-2 font-semibold">
                      Explanation
                    </label>

                    <textarea
                      placeholder="Enter explanation"
                      value={q.explanation}
                      onChange={(e) =>
                        handleQuestionChange(
                          qIndex,
                          "explanation",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-xl"
                      rows={3}
                    />

                  </div>

                </div>
              )
            )}

          </div>



          {/* ADD QUESTION BUTTON */}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-200"
          >
            + Add Question
          </button>



          {/* SUBMIT */}
          <div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-bold transition"
            >
              {loading
                ? "Creating Quiz..."
                : "Create Daily Quiz"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AdminQuizPage;