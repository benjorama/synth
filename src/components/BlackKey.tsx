import React, { useState } from 'react';
import styles from '@/styles/Synth.module.css'
import { getState, setState } from '@/State';
import { SynthKeyProps } from './SynthKey';
import { getFlat } from '@/Utils';

export function BlackKey({ synth, keyboardKey, pitch, keyDown, onClick, enabled = false }: SynthKeyProps) {
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
        <p>{`${pitch}`}</p>
        <p>{`${getFlat(pitch, true)}`}</p>
        <span>({keyboardKey})</span>
    </div>
  )

  const enabledKey = (
    <button
      className={keyDown || onClick ? styles.blackKeyDown : styles.blackKey}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >{pitchLabel}</button>
  )

  const disabledKey = (
    <button
      className={keyDown || onClick ? styles.blackKeyDown : styles.blackKey}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled
    >{pitchLabel}</button>
  )

  if (enabled)
    return enabledKey

  return disabledKey
}
