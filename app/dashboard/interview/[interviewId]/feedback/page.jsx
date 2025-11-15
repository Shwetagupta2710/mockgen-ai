"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Activity, CheckCircle2, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const Feedback = ({ params }) => {
  const unwrappedParams = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, unwrappedParams.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);

      // Calculate the average rating dynamically, only including valid ratings
      const validRatings = result
        .map((item) => parseFloat(item.rating))
        .filter((rating) => !isNaN(rating));

      const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
      const avgRating =
        validRatings.length > 0
          ? (totalRating / validRatings.length).toFixed(1)
          : "N/A";

      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600";
    if (numRating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">
            Loading your interview feedback...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      {feedbackList.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-20">
          <CheckCircle2 className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            No Interview Feedback Available
          </h2>
          <p className="text-gray-600 mt-4 mb-6">
            It seems like no feedback has been generated for this interview.
            Please complete the interview first.
          </p>
          <Button
            variant="outline"
            onClick={() => router.replace("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-green-600">
                  Congratulations!
                </h2>
                <p className="text-gray-600">
                  Your Mock Interview is completed successfully.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Overall Rating</p>
                <p
                  className={`text-3xl font-bold ${getRatingColor(
                    averageRating
                  )}`}
                >
                  {averageRating}/10
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Questions</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {feedbackList.length}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Detailed Interview Feedback
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Find below interview questions with correct answers, your answers,
              and feedback for improvement.
            </p>

            {feedbackList.map((item, index) => (
              <Collapsible key={index} className="mb-4">
                <CollapsibleTrigger className="p-4 flex justify-between items-center gap-4 w-full bg-white hover:bg-gray-50 rounded-lg border shadow-sm text-left transition-all">
                  <span className="font-medium">
                    {index + 1}. {item.question}
                  </span>
                  <ChevronsUpDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 space-y-3 p-4 bg-white border border-t-0 rounded-b-lg">
                    <div className="p-3 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <p className="text-sm font-semibold text-purple-900 mb-1">
                        Rating
                      </p>
                      <p
                        className={`text-2xl font-bold ${getRatingColor(
                          item.rating
                        )}`}
                      >
                        {item.rating}/10
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg bg-red-50">
                      <p className="text-sm font-semibold text-red-900 mb-2">
                        Your Answer:
                      </p>
                      <p className="text-sm text-red-800">{item.userAns}</p>
                    </div>

                    <div className="p-3 border rounded-lg bg-green-50">
                      <p className="text-sm font-semibold text-green-900 mb-2">
                        Correct Answer:
                      </p>
                      <p className="text-sm text-green-800">
                        {item.correctAns || "Not provided"}
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg bg-blue-50">
                      <p className="text-sm font-semibold text-blue-900 mb-2">
                        Feedback:
                      </p>
                      <p className="text-sm text-blue-800">{item.feedback}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => router.replace("/dashboard")}
                className="px-8"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
