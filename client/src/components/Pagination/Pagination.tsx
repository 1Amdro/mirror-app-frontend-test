import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const getPages = () => {
    const pages: (number | "...prev" | "...next")[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...prev");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...next");

      pages.push(totalPages);
    }

    return pages;
  };

  const handleDotsClick = (type: "...prev" | "...next") => {
    const jump = 5;
    const newPage =
      type === "...prev"
        ? Math.max(currentPage - jump, 1)
        : Math.min(currentPage + jump, totalPages);

    onPageChange(newPage);
  };

  return (
    <div className={styles.nav_wrapper}>
      {getPages().map((item, idx) => {
        if (typeof item === "number") {
          return (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`${styles.page_button} ${
                currentPage === item ? styles.page_button_active : ""
              }`}
            >
              {item}
            </button>
          );
        } else if (item === "...prev" || item === "...next") {
          return (
            <button
              key={item + idx}
              onClick={() => handleDotsClick(item)}
              className={styles.page_dots_button}
            >
              ...
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
