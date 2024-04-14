// import React from "react";
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
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="english word"
          name="english"
          value={editFormData.english}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="транскрипция"
          name="transcription"
          value={editFormData.transcription}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="перевод слова"
          name="russian"
          value={editFormData.russian}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className={styles.buttonWrapper}>
        <button title="сохранить" className={styles.saveButton} type="submit">
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
        <button title="отмена" type="button" onClick={handleCancelClick}>
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
