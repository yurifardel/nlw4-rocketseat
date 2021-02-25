import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout;

export function Countdown(){
  const contextData = useContext(ChallengesContext)
  console.log(contextData)


  const [time, setTime] = useState(0.1 * 60)
  const [active, setActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  function startCountdown(){
    setActive(true)
  }

  function andCountdown(){
    clearTimeout(countdownTimeOut);
    setActive(false)
    setTime(0.1 * 60)
  }

  useEffect(() =>{
    if(active && time > 0){
      countdownTimeOut = setTimeout(() =>{
        setTime(time - 1)
      }, 1000)
    }
    else if (active && time === 0){
      setHasFinished(true)
      setActive(false)

      
    }
  }, [active, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
        disabled
        className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
     
      ) : (
        <>
          { active ? (
            <button type='button' 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
            onClick={andCountdown}
            >
              Abandonar ciclo
            </button>
        ) : ( 
            <button type='button' 
            className={styles.countdownButton} 
            onClick={startCountdown}
            >
              Iniciar ciclo
            </button>
        
          )}
        </>
      )} 
      </div>
    
  );
}