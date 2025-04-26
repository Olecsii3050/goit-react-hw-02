import css from "./Feedback.module.css";

const Feedback = ({ clicks, totalFeedback, positive }) => {
  return (
    <div className={css.feedback}>
      <p>Good: {clicks.good}</p>
      <p>Neutral: {clicks.neutral}</p>
      <p>Bad: {clicks.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positive}%</p>
    </div>
  );
};

export default Feedback;
