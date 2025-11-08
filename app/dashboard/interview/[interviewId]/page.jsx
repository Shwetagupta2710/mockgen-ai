"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";
import Link from "next/link";

function Interview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, interviewId));

      if (result && result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.warn("No interview found for id:", interviewId);
      }
    } catch (err) {
      console.error("Error fetching interview:", err);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-8">Let's Get Started</h2>

      {/* ✅ Two-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full max-w-5xl px-6">
        {/* LEFT COLUMN — Interview details */}
        {interviewData ? (
          <div className="flex flex-col gap-6">
            {/* Job Info Card */}
            <div className="flex flex-col border rounded-xl p-6 shadow-sm bg-white">
              <h2 className="text-lg mb-2">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg mb-2">
                <strong>Job Description/Tech Stack:</strong>{" "}
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData.jobExperience}
              </h2>
            </div>

            {/* Info Section */}
            <div className="flex items-start gap-3 border rounded-xl p-5 shadow-sm border-yellow-300 bg-amber-50">
              <div>
                <h2 className="flex gap-2 items-center text-yellow-600 p-1">
                  <Lightbulb className="text-yellow-600" />
                  <span>Information</span>
                </h2>
                <p className="text-sm text-gray-700">
                  Enable your webcam and microphone to start your AI-generated
                  mock interview. It consists of 5 questions, and you’ll receive
                  a report based on your responses. <br /> <br />
                  <strong>Note:</strong> Your video is never recorded, and you
                  can disable webcam access anytime.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Loading interview details...</p>
        )}

        {/* RIGHT COLUMN — Webcam */}
        <div className="flex flex-col items-center justify-center border rounded-xl p-6 shadow-sm bg-white">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
                borderRadius: "12px",
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Start Interview Button */}
      <div className="w-full max-w-5xl px-6 mt-8 flex justify-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="px-6">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
