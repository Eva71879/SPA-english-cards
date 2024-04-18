import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import styles from "./WordList.module.css";

const ReadOnlyRow = ({ word, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{word.english}</td>
      <td>{word.transcription}</td>
      <td>{word.russian}</td>
      <td>
        <button
          type="button"
          title="редактировать"
          onClick={(event) => handleEditClick(event, word)}
        >
          <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
        </button>
      </td>
      <td>
        <button
          type="button"
          title="удалить"
          onClick={() => handleDeleteClick(word.id)}
        >
          <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
