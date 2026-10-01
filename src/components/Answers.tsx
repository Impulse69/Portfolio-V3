import { answers } from "@/lib/answers";
import styles from "./Answers.module.css";

export default function Answers() {
  return (
    <section className={`shell ${styles.section}`} aria-labelledby="answers-title">
      <div>
        <p className="eyebrow">COMMON QUESTIONS</p>
        <h2 id="answers-title" className={styles.heading}>A little more<br /><em>context.</em></h2>
      </div>
      <div className={styles.answers}>
        {answers.map(({ question, answer }) => (
          <div key={question} className={styles.answer}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
