"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession, retryWithBackoff } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [micAllowed, setMicAllowed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Removed the problematic useEffect that causes infinite loop
  // UpdateUserAnswer will be called manually when recording stops

  const {
    error,
    interimResult,
    isRecording,
    results = [],
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // 🧠 Combine all transcripts into one string
  useEffect(() => {
    const combined = results.map((r) => r.transcript).join(" ");
    setUserAnswer(combined + (interimResult ? " " + interimResult : ""));
  }, [results, interimResult]);

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative bg-black rounded-lg overflow-hidden flex justify-center items-center w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] md:w-[480px] md:h-[360px]">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Request microphone permission before starting
  const handleRecordToggle = async () => {
    if (isRecording) {
      stopSpeechToText();
      
      // Validate answer length before processing
      if (userAnswer?.length < 10) {
        toast.error("Answer is too short. Please record again with more details.");
        return;
      }
      
      // Call UpdateUserAnswer to save and get feedback
      await UpdateUserAnswer();
      return;
    }

    // Start recording
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      startSpeechToText();
    } catch (err) {
      console.error("Microphone permission denied:", err);
      toast.error("Please allow microphone access to record your answer.");
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    setIsProcessing(true);
    toast.loading("Getting feedback on your answer...");

    try {
      const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer: " +
        userAnswer +
        ", Depends on questions and user answer for given interview question " +
        "please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";

      // Get AI feedback with retry logic
      const result = await retryWithBackoff(
        async () => await chatSession.sendMessage(feedbackPrompt),
        3,
        1000
      );

      const mockJsonResp = result.response
        .text()
        .replace(/```json\n?|```/g, "")
        .trim();
      
      console.log("AI Response:", mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // Save to database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast.dismiss();
        toast.success("User Answer recorded successfully!");
        setUserAnswer("");
      }
    } catch (error) {
      console.error("Error in UpdateUserAnswer:", error);
      toast.dismiss();

      // Provide specific error messages
      if (error.message?.includes("503") || error.message?.includes("overloaded")) {
        toast.error(
          "The AI service is currently overloaded. Please try again in a few moments.",
          { duration: 5000 }
        );
      } else if (error.message?.includes("429") || error.message?.includes("rate limit")) {
        toast.error(
          "Rate limit exceeded. Please wait a moment before trying again.",
          { duration: 5000 }
        );
      } else if (error.message?.includes("API key")) {
        toast.error(
          "API configuration error. Please contact support.",
          { duration: 5000 }
        );
      } else {
        toast.error(
          "Failed to save your answer. Please try again.",
          { duration: 5000 }
        );
      }
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam Preview */}
      <div className="relative bg-black rounded-lg overflow-hidden flex justify-center items-center w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] md:w-[480px] md:h-[360px]">
        <Image
          src="/webcam-removebg-preview.png"
          width={200}
          height={200}
          alt="webcam overlay"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
        />
        <Webcam mirrored className="w-full h-full object-cover z-10" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={handleRecordToggle}
          disabled={isProcessing}
          className="flex items-center gap-2"
        >
          <Mic className={isRecording ? "text-white animate-pulse" : ""} />
          {isProcessing ? "Processing..." : isRecording ? "Stop Recording" : "Record Answer"}
        </Button>

        {error && (
          <p className="text-red-600 text-sm mt-1">
            🎙️ Speech recognition not supported in this browser.
          </p>
        )}

         
      </div>
    </div>
  );
}

export default RecordAnswerSection;
