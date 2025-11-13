"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [micAllowed, setMicAllowed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

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

  // ✅ Request microphone permission before starting
  const handleRecordToggle = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving your answer, Please record again");
        return;
      }
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ", Depends on questions and user answer for given interview question" +
        "please give us rating for answer and feedback as area of improvement if any" +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text();
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      startSpeechToText();
    } catch (err) {
      console.error("Microphone permission denied:", err);
      alert("Please allow microphone access to record your answer.");
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
          className="flex items-center gap-2"
        >
          <Mic className={isRecording ? "text-white animate-pulse" : ""} />
          {isRecording ? "Stop Recording" : "Record Answer"}
        </Button>

        {error && (
          <p className="text-red-600 text-sm mt-1">
            🎙️ Speech recognition not supported in this browser.
          </p>
        )}

        <Button
          onClick={() => console.log("User Answer:", userAnswer)}
          variant="outline"
          className="text-sm"
        >
          Show User Answer
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
