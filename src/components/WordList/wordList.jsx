

function wordList(props) {
  

  return (
    <>
<div>
    <div className="word">
        <p>{props.word}</p>
    </div>
    <div className="transcription">
        <p>{props.transcription}</p>
    </div>
    <div className="translation">
        <p>{props.translation}</p>
    </div>
    <button className="edit">Редактировать</button>
    <button className="delete">Удалить</button>
</div>
    </>
  )
}

export default wordList;
