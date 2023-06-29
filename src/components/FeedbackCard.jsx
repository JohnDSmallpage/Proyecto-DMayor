import React from "react";
import { useFeedbackContext } from "../firebase models/FeedbackContext";


function FeedbackCard({feedback}) {
  
  const {feedbackList, handleFeedbackButton} = useFeedbackContext()

  const isFeedback = feedbackList?.listOfIds?.includes(feedback.id);
    return (
    <div>FeedbackCard</div>
  ) 
}
export default FeedbackCard;
