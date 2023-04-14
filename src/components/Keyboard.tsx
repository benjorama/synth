import React, { useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'

export function Keyboard() {
  const [powerOn, togglePower] = useState(false)
  let synthList: Tone.Synth<Tone.SynthOptions>[] = []

  function handleClickPowerButton() {
    togglePower(!powerOn)
    powerOn ? initializeSynth : deactivateSynths
  }

  function initializeSynth() {
    synthList.push(new Tone.Synth().toDestination())
  }

  function deactivateSynths() {
    synthList.forEach(synth => {
      synth.dispose()
    })
  }

  return (
    <>
      <button
        className={powerOn ? styles.powerOn : styles.powerOff}
        onClick={handleClickPowerButton}
      >Power</button>

      <div
        className={styles.keyboard}
      >
        <SynthKey pitch='C4' synth={synthList[0]} />
      </div>
    </>
  )
}
