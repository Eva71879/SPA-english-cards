import { useState, Fragment, useEffect, useContext } from "react";
import WordsContext from "../../contexts/WordsContext";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./WordList.module.css";
// import data from "../../data/data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Loader from "../UI/Loader";

const WordList = () => {
  const { words, fetchWords, addWord, updateWord, deleteWord } =
    useContext(WordsContext); // Получение данных и функций из контекста
  const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки данных
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWords();
        setIsLoading(false); // После завершения загрузки устанавливаем isLoading в false
      } catch (error) {
        setError(error.message); // Устанавливаем сообщение об ошибке в состояние error
        setIsLoading(false); // После ошибки также устанавливаем isLoading в false
      }
    };

    fetchData();
  }, []);
  // console.log(words);

  // const [words, setWords] = useState(data); //хранит массив слов без контекста

  // начало блока для полей добавления нового слова
  ////////////////////////////////////////////////

  const [addFormData, setAddFormData] = useState({
    // хранит данные формы для добавления слова
    english: "",
    transcription: "",
    russian: "",
  });

  const [errors, setErrors] = useState({
    // хранит данные об ошибках валидации вводимого слова
    english: "",
    transcription: "",
    russian: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData, [fieldName]: fieldValue };
    setAddFormData(newFormData);

    const errorMessage = validateField(fieldName, fieldValue);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));

    // После каждого изменения поля вызываем validateForm
    validateForm();
  };

  useEffect(() => {
    validateForm();
  }, [addFormData]);

  const handleAddFormSubmit = async (event) => {
    // обработчик события для управления состоянием формы сохранения нового слова
    event.preventDefault();

    // Вызываем функцию валидации перед отправкой формы
    const isValid = validateForm();
    console.log("Is form valid:", isValid);

    if (isValid) {
      const newWord = {
        id: nanoid(),
        english: addFormData.english,
        transcription: addFormData.transcription,
        russian: addFormData.russian,
      };

      // Выводим параметры формы в консоль
      console.log("Form data:", newWord);

      try {
        await addWord(newWord); // Используем функцию addWord из контекста для добавления нового слова
        // После успешного добавления слова сбрасываем значения полей и ошибок
        setAddFormData({
          english: "",
          transcription: "",
          russian: "",
        });
        setErrors({
          english: "",
          transcription: "",
          russian: "",
        });
        setIsFormValid(false);
        alert("Слово добавлено");
      } catch (error) {
        alert("Ошибка добавления слова");
        console.error("Error adding word:", error);
        // В случае ошибки отображаем сообщение пользователю или выполняем необходимые действия
      }
    }
  };

  // условия валидации каждого поля
  const validateField = (fieldName, value) => {
    let errorMessage = "";
    if (fieldName === "english") {
      if (value.trim() === "") {
        errorMessage = "обязательное поле";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "только английские буквы";
      }
    } else if (fieldName === "transcription") {
      if (value.trim() === "") {
        errorMessage = "обязательное поле";
      } else if (!/^[^\dа-яА-Я]+$/i.test(value)) {
        errorMessage = "только латинские буквы и символы";
      }
    } else if (fieldName === "russian") {
      if (value.trim() === "") {
        errorMessage = "обязательное поле";
      } else if (/\d/.test(value)) {
        errorMessage = "только русские буквы";
      } else if (/[a-zA-Z]/.test(value)) {
        errorMessage = "только русские буквы";
      }
    }
    return errorMessage;
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const isValidEnglish = validateField("english", addFormData.english);
    const isValidTranscription = validateField(
      "transcription",
      addFormData.transcription
    );
    const isValidRussian = validateField("russian", addFormData.russian);

    // Возвращаем true только если все три поля валидны
    const isFormValid =
      isValidEnglish === "" &&
      isValidTranscription === "" &&
      isValidRussian === "";

    setIsFormValid(isFormValid);
    return isFormValid;
  };

  const handleCancelAddWordClick = () => {
    // Сбросить значения полей формы
    setAddFormData({
      english: "",
      transcription: "",
      russian: "",
    });

    // Очистить сообщения об ошибках
    setErrors({
      english: "",
      transcription: "",
      russian: "",
    });
  };

  ///////////////////////////////////////////////
  // конец блока для полей добавления нового слова

  // начало блока для таблицы со словами
  ////////////////////////////////////////

  const [editFormData, setEditFormData] = useState({
    // хранит данные формы для редактирования слова
    english: "",
    transcription: "",
    russian: "",
  });

  const [editWordId, setEditWordId] = useState(null); // хранит идентификатор редактируемого слова

  const handleEditFormChange = (event) => {
    // обработчик события для управления состоянием формы редактирования слова
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    // обработчик события для управления состоянием формы сохранения редактированного слова
    event.preventDefault();

    const editedWord = {
      id: editWordId,
      english: editFormData.english,
      transcription: editFormData.transcription,
      russian: editFormData.russian,
    };

    try {
      await updateWord(editedWord); // Используем функцию updateWord из контекста для обновления слова
      setEditWordId(null);
    } catch (error) {
      alert("Ошибка редактирования слова");
      console.error("Error updating word:", error);
      // В случае ошибки отображаем сообщение пользователю или выполняем другие необходимые действия
    }
  };

  const handleEditClick = (event, word) => {
    // обработчик события для управления состоянием кнопки редактирования слова
    event.preventDefault();
    setEditWordId(word.id);

    const formValues = {
      english: word.english,
      transcription: word.transcription,
      russian: word.russian,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditWordId(null);
  };

  const handleDeleteClick = async (wordId) => {
    try {
      await deleteWord(wordId); // Используем функцию deleteWord из контекста для удаления слова
      // Если удаление прошло успешно, вызываем функцию fetchWords для обновления списка слов
      await fetchWords();
    } catch (error) {
      alert("Ошибка удаления слова");
      console.error("Ошибка удаления слова", error);
      // В случае ошибки отображаем сообщение пользователю или выполняем другие необходимые действия
    }
  };

  ////////////////////////////////////
  // конец блока для таблицы со словами

  return (
    <div className={styles.tableWrapper}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.fetchError}>Ошибка: {error}</div> // Показываем сообщение об ошибке в случае ошибки
      ) : (
        <Fragment>
          <form onSubmit={handleAddFormSubmit}>
            <table>
              <tbody className={styles.formChange}>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="english"
                      placeholder="добавить свое слово"
                      value={addFormData.english}
                      onChange={handleAddFormChange}
                      className={`${styles.input} ${
                        errors.english && styles.inputError
                      }`}
                    />
                    {errors.english && (
                      <div className={styles.errorMsg}>{errors.english}</div>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="transcription"
                      placeholder="транскрипция"
                      value={addFormData.transcription}
                      onChange={handleAddFormChange}
                      className={`${styles.input} ${
                        errors.transcription && styles.inputError
                      }`}
                    />
                    {errors.transcription && (
                      <div className={styles.errorMsg}>
                        {errors.transcription}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="russian"
                      placeholder="перевод слова"
                      value={addFormData.russian}
                      onChange={handleAddFormChange}
                      className={`${styles.input} ${
                        errors.russian && styles.inputError
                      }`}
                    />
                    {errors.russian && (
                      <div className={styles.errorMsg}>{errors.russian}</div>
                    )}
                  </td>
                  <td className={styles.tdButton}>
                    <button
                      type="submit"
                      title="добавить слово"
                      disabled={!isFormValid}
                      className={`${styles.button} ${
                        !isFormValid && styles.disabled
                      }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                    </button>
                  </td>
                  <td className={styles.tdButton}>
                    <button
                      type="reset"
                      title="отмена"
                      onClick={handleCancelAddWordClick}
                    >
                      <FontAwesomeIcon icon={faTimes} className={styles.icon} />{" "}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <tbody className={styles.formEdit}>
                {words.map((word) => (
                  <Fragment key={word.id}>
                    {editWordId === word.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        validateField={validateField} // передача правил валидации дочернему компоненту через пропсы
                        isFormValid={isFormValid} // Добавляем isFormValid
                        editWordId={editWordId}
                        setEditWordId={setEditWordId}
                        updateWord={updateWord}
                        handleEditFormSubmit={handleEditFormSubmit}
                      />
                    ) : (
                      <ReadOnlyRow
                        word={word}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default WordList;
