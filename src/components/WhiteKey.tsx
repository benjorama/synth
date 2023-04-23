import React, { useState } from 'react';
import styles from '@/styles/Synth.module.css'
import { getState, setState } from '@/State';
import { SynthKeyProps } from './SynthKey';

export function WhiteKey({ synth, keyboardKey, pitch, keyDown, onClick, enabled = false }: SynthKeyProps) {
  function handleMouseDown() {
    if (synth) {
      synth.triggerAttack(pitch)
      setState({ keysClicked: getState().keysClicked.concat([pitch]) })
    }
  }

  function handleMouseUp() {
    if (synth) {
      synth.triggerRelease()
      setState({ keysClicked: getState().keysClicked.filter(i => i !== pitch) })
    }
  }

  const pitchLabel = (
    <div className={styles.pitchContainer}>
      <p>{pitch}</p>
      <span>({keyboardKey})</span>
    </div>
  )

  const enabledKey = (
    <button
      className={keyDown || onClick ? styles.whiteKeyDown : styles.whiteKey}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >{pitchLabel}</button>
  )

  const disabledKey = (
    <button
      className={keyDown || onClick ? styles.whiteKeyDown : styles.whiteKey}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled
    ><p>{`${pitch} (${keyboardKey})`}</p></button>
  )

  if (enabled)
    return enabledKey

  return disabledKey
}
