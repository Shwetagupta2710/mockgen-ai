"use client";

import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Mic, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO SECTION WITH RICH GRADIENTS */}
      <section className="relative overflow-hidden text-center min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 py-12">
        {/* Layered Soft Gradient Blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] h-[600px] top-[-200px] left-[-150px] bg-indigo-400/30 blur-[220px] rounded-full"></div>
          <div className="absolute w-[700px] h-[700px] bottom-[-200px] right-[-200px] bg-purple-500/20 blur-[200px] rounded-full"></div>

          {/* Radial Highlights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_70%)]"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight tracking-tight px-2">
          Ace Your Next Interview with
          <span className="text-indigo-600"> MockGen AI</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed px-2">
          A smarter, faster and more confident way to prepare for real
          interviews. Practice speaking, get instant insights and improve
          continuously.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-md sm:max-w-none mx-auto px-2">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-6 sm:px-7 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition bg-indigo-600 hover:bg-indigo-700 text-white">
              Start Mock Interview <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>

          <Link href="#features" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-7 py-5 sm:py-6 text-base sm:text-lg border-gray-400 hover:border-gray-600 bg-white/60 backdrop-blur-sm transition shadow-sm"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Small Feature Indicators */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-2">
          <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <Brain className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <p className="font-semibold text-sm sm:text-base">AI-Powered Questions</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Questions tailored to your role
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <Mic className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="font-semibold text-sm sm:text-base">Voice-Based Practice</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Answer naturally using your voice
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <MessageSquare className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <p className="font-semibold text-sm sm:text-base">Instant AI Feedback</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Improve clarity and reduce fillers
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-12 sm:py-16 md:py-24 relative bg-gradient-to-br from-white via-gray-50 to-indigo-50/40"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[500px] h-[500px] top-[50%] left-[-150px] bg-indigo-300/30 blur-[200px] rounded-full"></div>
          <div className="absolute w-[500px] h-[500px] top-[30%] right-[-150px] bg-purple-300/30 blur-[200px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900">
            Why Choose MockGen AI?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 text-center mt-3 max-w-2xl mx-auto px-2">
            Created for ambitious students and professionals preparing for
            interviews.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-12 md:mt-16">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-200 hover:bg-white/80 backdrop-blur-sm">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                AI Generated Interviews
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                Get job-specific, dynamic interview questions created in
                seconds.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-200 hover:bg-white/80 backdrop-blur-sm">
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Voice Recording + Analysis
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                Record your answers, analyze clarity, filler usage, and speaking
                pace.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-200 hover:bg-white/80 backdrop-blur-sm">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Personalized Improvement Tips
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                Get detailed breakdowns, strengths and areas to improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-700 to-purple-700 text-white text-center relative overflow-hidden px-4">
        <div className="absolute bottom-[-100px] left-[20%] w-[350px] h-[350px] bg-white/10 blur-[140px] rounded-full -z-10"></div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
          Ready to Upgrade Your Interview Game?
        </h2>

        <p className="text-base sm:text-lg text-gray-200 mt-4 px-2 max-w-2xl mx-auto">
          Start practicing with AI-powered insights and become your best
          version.
        </p>

        <Link href="/dashboard" className="inline-block w-full sm:w-auto max-w-md sm:max-w-none px-2">
          <Button className="w-full sm:w-auto mt-6 sm:mt-8 px-6 sm:px-7 py-5 sm:py-6 text-base sm:text-lg bg-white text-indigo-700 hover:bg-gray-100 shadow-lg hover:shadow-2xl transition">
            Start Practicing <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
