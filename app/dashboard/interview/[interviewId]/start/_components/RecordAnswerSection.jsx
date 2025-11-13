"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnswerSection() {
  const [micAllowed, setMicAllowed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const speech = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const {
    error,
    interimResult,
    isRecording,
    results = [],
    startSpeechToText,
    stopSpeechToText,
  } = speech || {};

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center">
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

      <div className="flex flex-col items-center gap-3 mt-6">
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
            <h2 className="text-red-600 flex-gap-2">
              <Mic />
              Stop Recording
            </h2>
          ) : (
            "Record Answer"
          )}
        </Button>
        <Button onClick={() => console.log(userAnswer)}>
          Show User Answer
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
