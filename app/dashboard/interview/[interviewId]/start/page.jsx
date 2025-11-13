"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QuestionsSection from "./_components/QuestionsSection";
import { Button } from "@/components/ui/button";

const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false }
);

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, interviewId));

      if (result && result.length > 0) {
        const interview = result[0];
        let parsedQuestions = [];

        try {
          const data = JSON.parse(interview.jsonMockResp);
          if (Array.isArray(data)) parsedQuestions = data;
          else if (Array.isArray(data.questions)) parsedQuestions = data.questions;
        } catch (err) {
          console.error("Invalid JSON format for mock interview questions:", err);
        }

        setMockInterviewQuestion(parsedQuestions);
        setInterviewData(interview);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-600">
        Loading interview details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10 relative">
      <div className="max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section: Questions */}
          <div className="flex flex-col justify-between">
            <QuestionsSection
              mockInterviewQuestion={mockInterviewQuestion || []}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          </div>

          {/* Right Section: Webcam */}
          <div className="flex justify-center items-center">
            {!isLoading && (
              <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion || []}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-end gap-4 px-6 py-4 z-50">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            variant="outline"
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() =>
              (window.location.href = `/dashboard/interview/${interviewId}/feedback`)
            }
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
