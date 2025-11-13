import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";

function QuestionsSection({ mockInterviewQuestion = [] }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // ✅ Text-to-Speech handler
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // stop any ongoing speech
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10 bg-white shadow-sm">
        {/* Question selector grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((_, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200 ${
                activeQuestionIndex === index
                  ? "bg-blue-700 text-white"
                  : "bg-secondary hover:bg-blue-100"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        {/* Active question section */}
        {mockInterviewQuestion.length > 0 && (
          <div className="mt-8 p-5 border rounded-lg bg-gray-50 relative">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg mb-3">
                Question {activeQuestionIndex + 1}
              </h3>
              <Volume2
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() =>
                  textToSpeech(
                    mockInterviewQuestion[activeQuestionIndex]?.question
                  )
                }
              />
            </div>
            <p className="text-gray-700 leading-relaxed">
              {mockInterviewQuestion[activeQuestionIndex]?.question ||
                "Question text not available."}
            </p>
          </div>
        )}

        {/* Note Section */}
        <div className="mt-6 border rounded-lg p-4 bg-blue-100">
          <h2 className="flex gap-2 items-center text-primary mb-2">
            <Lightbulb className="w-5 h-5" />
            <strong>Note:</strong>
          </h2>
          <p className="text-sm text-primary my-2 leading-relaxed">
            Enable your webcam and microphone to start the AI-generated mock
            interview. It includes 5 questions. After completing them, you’ll
            receive a performance report based on your answers.
            <br />
            <span className="font-semibold">
              We never record your video; you can disable webcam access anytime.
            </span>
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
