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
    <div className="min-h-screen bg-white px-6 py-14 max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <div className="text-center flex flex-col items-center mb-16">
        <Image
          src="/logo.svg"
          width={190}
          height={80}
          alt="MockGen AI Logo"
          className="object-contain mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Your Interview Preparation Companion
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mt-3 max-w-2xl">
          Master your interviews with AI-powered practice and personalized
          insights.
        </p>
      </div>

      {/* HOW IT WORKS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              {step.icon}
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                Step {index + 1}: {step.title}
              </h2>
            </div>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/dashboard"
          className="bg-indigo-600 text-white px-10 py-3 rounded-full text-lg hover:bg-indigo-700 transition-all"
        >
          Start Your Interview Journey
        </a>
      </div>
    </div>
  );
};

export default HowItWorksPage;
