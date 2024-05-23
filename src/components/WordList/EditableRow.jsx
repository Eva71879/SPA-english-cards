import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import wordsStore from "../../stores/WordsStore";

import styles from "./WordList.module.css";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  validateField,
  editWordId,
  setEditWordId, // Добавляем пропс для обновления editWordId
}) => {
  const { updateWord } = wordsStore; //получение функции из store

  const [errors, setErrors] = useState({
    english: "",
    russian: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    validateForm();
  }, [editFormData]);

  const validateForm = () => {
    const isValidEnglish = validateField("english", editFormData.english);
    const isValidTranscription = validateField(
      "transcription",
      editFormData.transcription
    );
    const isValidRussian = validateField("russian", editFormData.russian);

    const isNotEmpty =
      editFormData.english.trim() !== "" &&
      editFormData.transcription.trim() !== "" &&
      editFormData.russian.trim() !== "";

    const isFormValid =
      isNotEmpty &&
      isValidEnglish === "" &&
      isValidTranscription === "" &&
      isValidRussian === "";

    setIsFormValid(isFormValid);
    return isFormValid;
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const errorMessage = validateField(fieldName, fieldValue);
    setErrors({ ...errors, [fieldName]: errorMessage });

    // Обновляем editFormData при изменении input
    const newEditFormData = { ...editFormData, [fieldName]: fieldValue };
    handleEditFormChange(event, newEditFormData);
  };

  const inputClassName = (fieldName) => {
    return errors[fieldName]
      ? `${styles.input} ${styles.empty} ${styles.inputError}`
      : styles.input;
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Word ID:", editWordId, "Form data:", editFormData);

    try {
      await updateWord({
        ...editFormData,
        tags: "",
        tags_json: "",
        id: editWordId,
      }); // Используем функцию обновления слова из store
      console.log("Changes saved successfully!");
      setEditWordId(null);
    } catch (error) {
      console.error("Error updating word:", error);
      // В случае ошибки отображаем сообщение пользователю или выполняем другие необходимые действия
    }
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
          onChange={handleInputChange}
          className={inputClassName("english")}
        />
        {errors.english && (
          <div className={styles.errorMsg}>{errors.english}</div>
        )}
      </td>
      <td>
        <input
          type="text"
          placeholder="транскрипция"
          name="transcription"
          value={editFormData.transcription}
          className={inputClassName("transcription")}
          onChange={handleInputChange}
        />
        {errors.transcription && (
          <div className={styles.errorMsg}>{errors.transcription}</div>
        )}
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="перевод слова"
          name="russian"
          value={editFormData.russian}
          className={inputClassName("russian")}
          onChange={handleInputChange}
        />
        {errors.russian && (
          <div className={styles.errorMsg}>{errors.russian}</div>
        )}
      </td>
      <td>
        <button
          title="сохранить"
          className={`${styles.saveButton} ${!isFormValid && styles.disabled}`}
          type="submit"
          disabled={!isFormValid}
          onClick={handleEditFormSubmit}
        >
          <FontAwesomeIcon icon={faSquareCheck} className={styles.icon} />
        </button>
      </td>
      <td>
        <button title="отмена" type="reset" onClick={handleCancelClick}>
          <FontAwesomeIcon icon={faArrowRotateLeft} className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
