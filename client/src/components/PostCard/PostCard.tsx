import { PostI } from "../../types/postInterface";
import styles from "./PostCard.module.css";

export default function PostCard({
  propTypeCard,
  propData,
  propClassName,
}: {
  propTypeCard: string;
  propData: PostI;
  propClassName?: string;
}) {
  function formatPostDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const msInDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((now.getTime() - date.getTime()) / msInDay);

    if (diffDays < 7) {
      if (diffDays === 0) return "Сегодня";
      return `${diffDays} ${getDayWord(diffDays)} назад`;
    }

    return date.toLocaleDateString("ru-RU"); // формат: дд.мм.гггг
  }

  function getDayWord(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return "день";
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
      return "дня";
    return "дней";
  }

  if (propTypeCard === "hover")
    return (
      <div className={propClassName}>
        <p className={styles.text_hover}>{propData.caption}</p>
        <div className={styles.wrap_hover}>
          <h3 className={styles.title}>{propData.user.username}</h3>
          <h4 className={styles.date}>{formatPostDate(propData.date)}</h4>
        </div>
        <div className={styles.second_wrap}>
          <span>💬 {propData.comments} </span> <span> 👍 {propData.likes}</span>
        </div>
      </div>
    );

  if (propTypeCard === "classic")
    return (
      <div className={propClassName}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>{propData.user.username}</h3>
          <h4 className={styles.date}>{formatPostDate(propData.date)}</h4>
        </div>

        <p className={styles.text}>{propData.caption}</p>
        <div className={styles.second_wrap}>
          <span>💬 {propData.comments} </span> <span> 👍 {propData.likes}</span>
        </div>
      </div>
    );
}
