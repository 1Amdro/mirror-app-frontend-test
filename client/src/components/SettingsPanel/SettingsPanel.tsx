import { Settings } from "../../types/settingsInterface";
import styles from "./SettingsPanel.module.css";

export default function SettingsPanel({
  update,
  settingsForPanel,
}: {
  update: () => void;
  settingsForPanel: Settings | null;
}) {
  const { layout, template, navigation } = settingsForPanel || {};

  const layoutValue =
    layout?.current === "grid" ? "Сетка" : "Плиточная верстка";

  const templateValue = template === "classic" ? "Классическая" : "Наведения";

  const navigationValue =
    navigation === "load-more" ? "Кнопка «Загрузить еще»" : "Пагинация";

  const columnsValue = layout?.params[layout.current].columns.toString();

  const rowsValue = layout?.params[layout.current].rows.toString();

  return (
    <aside className={styles.container}>
      <button onClick={update} className={styles.button}>
        Обновить
      </button>
      <div className={styles.form}>
        <label className={styles.label} htmlFor="layout">
          Шаблон (макет)
        </label>
        <input
          className={styles.input}
          placeholder={layoutValue}
          type="text"
          id="layout"
          disabled
        />
        <label className={styles.label} htmlFor="card">
          Карточка
        </label>
        <input
          className={styles.input}
          placeholder={templateValue}
          type="text"
          id="card"
          disabled
        />
        <label className={styles.label} htmlFor="navigation">
          Навигация
        </label>
        <input
          className={styles.input}
          placeholder={navigationValue}
          type="text"
          id="navigation"
          disabled
        />
        <label className={styles.label} htmlFor="column">
          Колонок
        </label>
        <input
          className={styles.input}
          placeholder={columnsValue}
          type="text"
          id="column"
          disabled
        />
        <label className={styles.label} htmlFor="row">
          Рядов
        </label>
        <input
          className={styles.input}
          placeholder={rowsValue}
          type="text"
          id="row"
          disabled
        />
      </div>
    </aside>
  );
}
