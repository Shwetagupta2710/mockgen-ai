"use client";

import { useState } from "react";
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket,
} from "lucide-react";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("mission");

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-5 text-gray-700 leading-relaxed text-lg md:text-xl">
          <p>
            MockGen AI is built to help learners practice interviews with
            clarity, structure, and confidence.
          </p>
          <p>
            Our mission is to make interview preparation simple, efficient, and
            personalized using AI tools that understand your goals.
          </p>
        </div>
      ),
    },

    story: {
      icon: <BookOpen className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-5 text-gray-700 leading-relaxed text-lg md:text-xl">
          <p>
            MockGen AI began as a personal project created to solve a real-world
            student problem — interviews feel stressful and confusing.
          </p>
          <p>
            With time, it evolved into a beautifully designed platform helping
            individuals prepare effectively for their careers.
          </p>
        </div>
      ),
    },

    approach: {
      icon: <Rocket className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-5 text-gray-700 leading-relaxed text-lg md:text-xl">
          <p>
            The platform uses smart question generation, voice analysis, and
            communication scoring to simulate real interview environments.
          </p>
          <p>
            With structured insights and continuous improvement, users grow with
            each practice session.
          </p>
        </div>
      ),
    },
  };

  const coreValues = [
    {
      icon: <Award className="w-16 h-16 text-indigo-600" />,
      title: "Continuous Learning",
      description:
        "We commit to building tools that adapt to evolving industry needs.",
    },
    {
      icon: <Users className="w-16 h-16 text-indigo-600" />,
      title: "Empowerment",
      description:
        "We help individuals gain clarity and confidence in communication.",
    },
    {
      icon: <Briefcase className="w-16 h-16 text-indigo-600" />,
      title: "Excellence",
      description:
        "We focus on clean, effective, and meaningful features — never clutter.",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="text-center mb-12 sm:mb-20 md:mb-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            About MockGen AI
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mt-4 sm:mt-6">
            AI-powered mock interviews crafted for students and professionals to
            practice, improve, and build confidence.
          </p>
        </div>

        {/* TABS SECTION */}
        <div className="bg-white border rounded-xl shadow-lg overflow-hidden mb-12 sm:mb-16 md:mb-[200px]">
          <div className="flex flex-col sm:flex-row border-b">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full sm:flex-1 py-4 sm:py-5 px-4 flex items-center justify-center text-sm sm:text-base md:text-lg transition-all ${
                  activeTab === tab
                    ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 bg-gray-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tabContent[tab].icon}
                <span className="ml-2 sm:ml-0 sm:hidden md:inline capitalize">{tab}</span>
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-7 md:p-9">{tabContent[activeTab].content}</div>
        </div>

        {/* SPACER so Core Values appear ONLY AFTER SCROLL */}
        <div className="h-1"></div>

        {/* CORE VALUES */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12 md:mb-16">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 md:p-10 bg-white border rounded-xl shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="flex justify-center mb-4 sm:mb-6">{value.icon}</div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {value.title}
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
