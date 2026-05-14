// import { useState } from "react";
// import { askAI } from "../../services/test.service";

// const AIChat = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAsk = async () => {
//     if (!message.trim()) return;

//     try {
//       setLoading(true);

//       const res = await askAI(message);

//       setResponse(res.data.response);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       <div className="bg-white rounded-2xl shadow-lg p-6">

//         <h1 className="text-3xl font-bold mb-6">
//           AI Doubt Solver 🤖
//         </h1>

//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Ask any doubt..."
//           className="
//             w-full
//             h-40
//             border
//             rounded-xl
//             p-4
//             outline-none
//             focus:ring-2
//             focus:ring-indigo-500
//           "
//         />

//         <button
//           onClick={handleAsk}
//           disabled={loading}
//           className="
//             mt-4
//             bg-indigo-600
//             hover:bg-indigo-700
//             text-white
//             px-6
//             py-3
//             rounded-xl
//             transition
//           "
//         >
//           {loading ? "Thinking..." : "Ask AI"}
//         </button>

//         {response && (
//           <div className="mt-6 bg-gray-100 rounded-xl p-5">
//             <h2 className="font-semibold mb-2">
//               AI Response:
//             </h2>

//             <p className="whitespace-pre-line text-gray-700">
//               {response}
//             </p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AIChat;



// import { useState } from "react";
// import { askAI } from "../../services/test.service";

// const AIChat = () => {

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [reply, setReply] = useState("");

//   const handleAsk = async () => {

//     if (!message) return;

//     try {

//       setLoading(true);

//       const res = await askAI(message);

//       setReply(res.data.reply);

//     } catch (err) {

//       console.error(err);

//       alert("AI Failed");

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden border z-50">

//       <div className="bg-indigo-600 text-white p-4 font-bold">
//         RankPulse AI
//       </div>

//       <div className="p-4 space-y-4">

//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Ask anything..."
//           className="w-full border rounded-xl p-3 h-28 outline-none"
//         />

//         <button
//           onClick={handleAsk}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
//         >
//           {loading ? "Thinking..." : "Ask AI"}
//         </button>

//         {reply && (
//           <div className="bg-gray-100 p-3 rounded-xl text-sm whitespace-pre-wrap">
//             {reply}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AIChat;




import { useEffect, useRef, useState } from "react";
import { askAI } from "../../services/test.service";

import {
  Bot,
  Send,
  Sparkles,
  User,
  X,
  MessageSquare,
  Loader2,
} from "lucide-react";

const AIChat = () => {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "👋 Hi! I’m RankPulse AI.\n\nAsk me about:\n• Government Exams\n• Physics / Math / Reasoning\n• Mock Tests\n• Current Affairs\n• Study Plans",
    },
  ]);

  const bottomRef = useRef(null);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // 🔥 ASK AI
  const handleAsk = async () => {

    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {

      setLoading(true);

      const res = await askAI(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.reply,
        },
      ]);

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "⚠️ AI is temporarily unavailable. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  // 🔥 ENTER SEND
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <>
      {/* 🔥 FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-5 right-5 z-50

            flex items-center gap-3

            bg-gradient-to-r
            from-indigo-600
            to-blue-500

            hover:scale-105
            hover:shadow-2xl

            text-white

            px-5 py-3
            rounded-2xl

            shadow-xl

            transition-all duration-300
          "
        >

          <div
            className="
              w-10 h-10
              rounded-full
              bg-white/20
              flex items-center justify-center
            "
          >
            <Sparkles size={20} />
          </div>

          <div className="hidden sm:block text-left">
            <p className="font-bold text-sm">
              RankPulse AI
            </p>

            <p className="text-xs text-white/80">
              Ask Anything
            </p>
          </div>

        </button>
      )}

      {/* 🔥 CHAT WINDOW */}
      {open && (
        <div
          className="
            fixed z-50

            bottom-4 right-4

            w-[95%]
            sm:w-[420px]

            h-[85vh]
            sm:h-[720px]

            max-h-[720px]

            bg-white
            rounded-3xl
            overflow-hidden

            border border-gray-200

            shadow-[0_20px_60px_rgba(0,0,0,0.18)]

            flex flex-col
          "
        >

          {/* 🔥 HEADER */}
          <div
            className="
              bg-gradient-to-r
              from-indigo-600
              to-blue-500

              text-white

              px-5 py-4

              flex items-center justify-between
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-white/20
                  flex items-center justify-center
                "
              >
                <Bot size={24} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  RankPulse AI
                </h2>

                <p className="text-xs text-white/80">
                  Online • AI Study Assistant
                </p>
              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="
                w-10 h-10
                rounded-xl
                hover:bg-white/10
                flex items-center justify-center
                transition
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* 🔥 CHAT BODY */}
          <div
            className="
              flex-1
              overflow-y-auto

              bg-gradient-to-b
              from-gray-50
              to-white

              px-4 py-5

              space-y-5
            "
          >

            {messages.map((msg, index) => {

              const isAI = msg.role === "ai";

              return (
                <div
                  key={index}
                  className={`
                    flex
                    ${isAI ? "justify-start" : "justify-end"}
                  `}
                >

                  <div
                    className={`
                      flex gap-3 max-w-[90%]

                      ${
                        !isAI
                          ? "flex-row-reverse"
                          : ""
                      }
                    `}
                  >

                    {/* AVATAR */}
                    <div
                      className={`
                        w-10 h-10
                        rounded-2xl
                        flex items-center justify-center
                        shrink-0

                        ${
                          isAI
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-blue-100 text-blue-600"
                        }
                      `}
                    >
                      {isAI ? (
                        <Bot size={18} />
                      ) : (
                        <User size={18} />
                      )}
                    </div>

                    {/* MESSAGE */}
                    <div
                      className={`
                        px-4 py-3
                        rounded-2xl
                        text-sm
                        whitespace-pre-wrap
                        leading-relaxed
                        shadow-sm

                        ${
                          isAI
                            ? `
                              bg-white
                              border
                              text-gray-800
                              rounded-tl-md
                            `
                            : `
                              bg-gradient-to-r
                              from-indigo-600
                              to-blue-500

                              text-white
                              rounded-tr-md
                            `
                        }
                      `}
                    >
                      {msg.text}
                    </div>

                  </div>

                </div>
              );
            })}

            {/* 🔥 LOADING */}
            {loading && (
              <div className="flex justify-start">

                <div className="flex gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-2xl
                      bg-indigo-100
                      text-indigo-600
                      flex items-center justify-center
                    "
                  >
                    <Bot size={18} />
                  </div>

                  <div
                    className="
                      bg-white border
                      px-4 py-3
                      rounded-2xl rounded-tl-md
                      flex items-center gap-2
                      shadow-sm
                    "
                  >

                    <Loader2
                      size={18}
                      className="animate-spin text-indigo-600"
                    />

                    <span className="text-sm text-gray-600">
                      Thinking...
                    </span>

                  </div>

                </div>

              </div>
            )}

            <div ref={bottomRef} />

          </div>

          {/* 🔥 QUICK SUGGESTIONS */}
          <div className="px-4 py-3 border-t bg-white">

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

              {[
                "Explain Ohm's Law",
                "Daily Current Affairs",
                "Best SSC strategy",
                "Railway exam syllabus",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setMessage(q)}
                  className="
                    whitespace-nowrap
                    px-3 py-2
                    rounded-full
                    bg-gray-100
                    hover:bg-indigo-100
                    hover:text-indigo-600
                    text-sm
                    transition
                  "
                >
                  {q}
                </button>
              ))}

            </div>

          </div>

          {/* 🔥 INPUT */}
          <div
            className="
              border-t
              bg-white

              px-4 py-4
            "
          >

            <div
              className="
                flex items-end gap-3

                bg-gray-100
                rounded-2xl

                px-3 py-3
              "
            >

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about exams, physics, reasoning..."
                rows={1}
                className="
                  flex-1
                  bg-transparent
                  resize-none
                  outline-none

                  text-sm

                  max-h-32
                "
              />

              <button
                onClick={handleAsk}
                disabled={loading || !message.trim()}
                className={`
                  w-11 h-11
                  rounded-xl

                  flex items-center justify-center

                  transition-all duration-200

                  ${
                    loading || !message.trim()
                      ? `
                        bg-gray-300
                        cursor-not-allowed
                      `
                      : `
                        bg-gradient-to-r
                        from-indigo-600
                        to-blue-500

                        hover:scale-105

                        text-white
                        shadow-lg
                      `
                  }
                `}
              >
                <Send size={18} />
              </button>

            </div>

            <p className="text-[11px] text-gray-400 mt-2 text-center">
              AI can make mistakes. Verify important answers.
            </p>

          </div>

        </div>
      )}
    </>
  );
};

export default AIChat;