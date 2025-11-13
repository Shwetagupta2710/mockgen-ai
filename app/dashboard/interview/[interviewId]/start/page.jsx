"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

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
          if (Array.isArray(data)) {
            parsedQuestions = data;
          } else if (Array.isArray(data.questions)) {
            parsedQuestions = data.questions;
          } else {
            console.warn("Parsed JSON is not an array:", data);
          }
        } catch (err) {
          console.error(
            "Invalid JSON format for mock interview questions:",
            err
          );
        }

        setMockInterviewQuestion(parsedQuestions);
        setInterviewData(interview);
      } else {
        console.warn("No interview found for ID:", interviewId);
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
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section: Questions */}
        <div className="flex flex-col justify-between">
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion || []}
            activeQuestionIndex={activeQuestionIndex}
          />
        </div>

        {/* Right Section: Webcam */}
        <div className="flex justify-center items-center">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion || []}
            activeQuestionIndex={activeQuestionIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
