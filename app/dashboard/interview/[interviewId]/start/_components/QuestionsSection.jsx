import { Lightbulb } from "lucide-react";
import React, { useState } from "react";

function QuestionsSection({ mockInterviewQuestion = [] }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10 bg-white shadow-sm">
        {/* Question Navigator Grid */}
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

        {/* Active Question Display */}
        {mockInterviewQuestion.length > 0 && (
          <div className="mt-8 p-5 border rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">
              Question {activeQuestionIndex + 1}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {mockInterviewQuestion[activeQuestionIndex]?.question ||
                "Question text not available."}
            </p>
          </div>
        )}

        {/* Tip Section */}
        <div className="mt-6 border rounded-lg p-4 bg-blue-100">
          <h2 className="flex gap-2 items-center text-primary mb-2">
            <Lightbulb className="w-5 h-5" />
            <strong>Note:</strong>
          </h2>
          <p className="text-sm text-primary my-2 leading-relaxed">
            Enable Video Web Cam and Microphone to Start your AI Generated Mock
            Interview, It Has 5 questions which you can answer and at last you
            will get the report on the basis of your answer. NOTE: We never
            record your video, Web cam access you can disable at any time if you
            want.
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
