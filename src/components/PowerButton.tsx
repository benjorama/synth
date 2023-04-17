import React, { useState } from 'react'
import styles from '@/styles/Synth.module.css'

export function PowerButton() {
  const [power, setPower] = useState(false)

  function handleClickPowerButton() {
    setPower(!power)
  }

  return (
    <button
      className={power ? styles.powerOn : styles.powerOff}
      onClick={handleClickPowerButton}
    >Power</button>
  )
}
