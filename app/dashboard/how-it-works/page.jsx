"use client";

import React from "react";
import {
  UserCheck,
  Settings,
  Play,
  Send,
  ChartBar,
  Repeat,
} from "lucide-react";
import Image from "next/image";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={48} className="text-indigo-600" />,
      title: "Sign Up or Log In",
      description:
        "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences.",
    },
    {
      icon: <Settings size={48} className="text-indigo-600" />,
      title: "Choose Your Interview Type",
      description:
        "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals.",
    },
    {
      icon: <Play size={48} className="text-indigo-600" />,
      title: "Start the Mock Interview",
      description:
        "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged.",
    },
    {
      icon: <Send size={48} className="text-indigo-600" />,
      title: "Submit Your Answers",
      description:
        "Respond using voice or text. The interface ensures smooth response tracking and a seamless experience.",
    },
    {
      icon: <ChartBar size={48} className="text-indigo-600" />,
      title: "Receive Real-Time Feedback",
      description:
        "Get instant AI-powered evaluation of your responses. Understand strengths, weaknesses, and improvement areas.",
    },
    {
      icon: <Repeat size={48} className="text-indigo-600" />,
      title: "Continue Practicing",
      description:
        "Access previous interviews, track your progress, and hone your communication skills with AI-powered repetitions.",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12 md:py-14 max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <div className="text-center flex flex-col items-center mb-10 sm:mb-14 md:mb-16">
        <Image
          src="/logo.svg"
          width={160}
          height={70}
          alt="MockGen AI Logo"
          className="object-contain mb-4 sm:mb-6"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 px-2">
          Your Interview Preparation Companion
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 max-w-2xl px-2">
          Master your interviews with AI-powered practice and personalized
          insights.
        </p>
      </div>

      {/* HOW IT WORKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-start sm:items-center mb-4 gap-3">
              <div className="flex-shrink-0">{step.icon}</div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                Step {index + 1}: {step.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10 sm:mt-14 md:mt-16 px-4">
        <a
          href="/dashboard"
          className="inline-block w-full sm:w-auto bg-indigo-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          Start Your Interview Journey
        </a>
      </div>
    </div>
  );
};

export default HowItWorksPage;
