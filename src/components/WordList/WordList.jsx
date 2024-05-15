import { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./WordList.module.css";
import data from "../../data/data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const WordList = () => {
  const [words, setWords] = useState(data);
  const [addFormData, setAddFormData] = useState({
    english: "",
    transcription: "",
    russian: "",
  });

  const [editFormData, setEditFormData] = useState({
    english: "",
    transcription: "",
    russian: "",
  });

  const [editWordId, setEditWordId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newWord = {
      id: nanoid(),
      english: addFormData.english,
      transcription: addFormData.transcription,
      russian: addFormData.russian,
    };

    const newWords = [...words, newWord];
    setWords(newWords);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedWord = {
      id: editWordId,
      english: editFormData.english,
      transcription: editFormData.transcription,
      russian: editFormData.russian,
    };

    const newWords = [...words];

    const index = words.findIndex((word) => word.id === editWordId);

    newWords[index] = editedWord;

    setWords(newWords);
    setEditWordId(null);
  };

  const handleEditClick = (event, word) => {
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

  const handleDeleteClick = (wordId) => {
    const newWords = [...words];

    const index = words.findIndex((word) => word.id === wordId);

    newWords.splice(index, 1);

    setWords(newWords);
  };

  return (
    <div className={styles.tableWrapper}>
      <form onSubmit={handleAddFormSubmit}>
        <table>
          <tbody className={styles.formChange}>
            <tr>
              <td>
                <input
                  type="text"
                  name="english"
                  required="required"
                  placeholder="добавить свое слово"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="transcription"
                  required="required"
                  placeholder="транскрипция"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="russian"
                  required="required"
                  placeholder="перевод слова"
                  onChange={handleAddFormChange}
                />
              </td>
              <td className={styles.tdButton}>
                <button type="submit" title="добавить слово">
                  <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                </button>
              </td>
              <td className={styles.tdButton}>
                <button type="submit">
                  <FontAwesomeIcon icon={faTimes} className={styles.icon} />
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
    </div>
  );
};

export default WordList;
