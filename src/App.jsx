import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedClicks = JSON.parse(localStorage.getItem("feedbackClicks"));
    if (savedClicks) {
      setClicks(savedClicks);
      setIsOpen(Object.values(savedClicks).some((count) => count > 0));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbackClicks", JSON.stringify(clicks));
  }, [clicks]);

  const totalFeedback = Object.values(clicks).reduce(
    (total, count) => total + count,
    0
  );

  const positive =
    totalFeedback > 0 ? Math.round((clicks.good / totalFeedback) * 100) : 0;

  const updateFeedback = (feedbackType) => {
    setClicks((prevClicks) => {
      const updatedClicks = {
        ...prevClicks,
        [feedbackType]: prevClicks[feedbackType] + 1,
      };
      setIsOpen(Object.values(updatedClicks).some((count) => count > 0));
      return updatedClicks;
    });
  };

  const resetFeedback = () => {
    setClicks({ good: 0, neutral: 0, bad: 0 });
    setIsOpen(false);
  };

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {isOpen ? (
        <Feedback
          clicks={clicks}
          totalFeedback={totalFeedback}
          positive={positive}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
