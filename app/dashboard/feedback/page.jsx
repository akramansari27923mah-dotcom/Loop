import FeedbackPage from "@/components/dashboard/Feedback";
import { getUser } from "@/lib/auth-utils";
import React from "react";

const Feedback = async () => {
  const session = await getUser();

  return (
    <div>
      <FeedbackPage session={session} />
    </div>
  );
};

export default Feedback;
