import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal( {timeRemaining, targetTime, timerReset}, ref ){
  const dialog = useRef();
  const isUserLost = timeRemaining <= 0;
  const timeRemainingInSeconds = (timeRemaining/1000).toFixed(2);
  const score = Math.round((1 - (timeRemaining / (targetTime*1000))) * 100)

  useImperativeHandle(ref, () => {
    return {
      open(){
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog className="result-modal" ref = { dialog } onClose = { timerReset }>
      { isUserLost && <h2>You Lost !!</h2> }
      { !isUserLost && <h2> Your score: { score } </h2> }
      <p> The target time was <strong> { targetTime } </strong></p>
      <p> You stopped the time with <string> { timeRemainingInSeconds } seconds left.</string></p>
      <form method = 'dialog' onSubmit={timerReset}>
        <button> Close </button>
      </form>
    </dialog>, 
    document.getElementById('modal')
  )
}
);

export default ResultModal;