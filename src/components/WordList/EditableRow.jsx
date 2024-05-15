import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./WordList.module.css";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  isFormValid, // Передаем состояние валидности формы редактирования
}) => {
  // Проверяем, является ли поле пустым
  const isFieldEmpty = (fieldName) => {
    return editFormData[fieldName].trim() === "";
  };

  // Добавляем класс для обводки красной рамкой, если поле пустое
  const inputClassName = (fieldName) => {
    return isFieldEmpty(fieldName)
      ? `${styles.input} ${styles.empty}`
      : styles.input;
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="english word"
          name="english"
          value={editFormData.english}
          className={inputClassName("english")} // Добавляем класс для обводки красной рамкой, если поле пустое
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="транскрипция"
          name="transcription"
          value={editFormData.transcription}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="перевод слова"
          name="russian"
          value={editFormData.russian}
          className={inputClassName("russian")} // Добавляем класс для обводки красной рамкой, если поле пустое
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button
          title="сохранить"
          className={styles.saveButton}
          type="submit"
          disabled={!isFormValid} // Блокируем кнопку сохранения, если форма не валидна
        >
          <FontAwesomeIcon icon={faSquareCheck} className={styles.icon} />
        </button>
      </td>
      <td>
        <button title="отмена" type="button" onClick={handleCancelClick}>
          <FontAwesomeIcon icon={faArrowRotateLeft} className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
