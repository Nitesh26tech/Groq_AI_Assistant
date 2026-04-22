import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { askAI } from "./services/api";

function App() {
  let [question, setQuestion] = useState();
  let [answer, setAnswer] = useState(null);

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question)
    try {
      const res = await askAI({ question });
      setAnswer(res.data.reply);
      setQuestion("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Chat With Nits AI Assistant
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-[35%_65%] overflow-hidden">
        <div className="p-6 border-r border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
            <label className="text-sm font-medium text-gray-600">
              Ask something
            </label>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full h-[220px] resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 transition text-white py-2 rounded-lg font-medium"
            >
              Generate Response
            </button>
          </form>
        </div>

        <div className="p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            AI Response
          </h2>

          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-y-auto max-h-[400px]">
            {answer ? (
              <ReactMarkdown>{answer}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 text-sm">
                Your response will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
