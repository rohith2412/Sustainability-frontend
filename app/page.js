import History from "@/components/History";
import Score from "@/components/Score";
import ScoreSummary from "@/components/ScoreSummary";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 " >
      <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-10">
        Sustainability Dashboard
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <div className="lg:w-1/2">
          <Score />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-8">
          <History />
          <div><ScoreSummary /></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
