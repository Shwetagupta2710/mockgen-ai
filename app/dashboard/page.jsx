import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h2 className="font-bold text-xl sm:text-2xl">Dashboard</h2>
      <h2 className="text-sm sm:text-base text-gray-500 mt-1">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-4 sm:my-5">
        <AddNewInterview />
      </div>
      {/*Previous Interview List*/}
      <InterviewList />
    </div>
  );
}

export default Dashboard;
