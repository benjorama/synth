import React, { useState } from 'react';
import styles from '@/styles/Synth.module.css'
import * as Tone from 'tone'
import { getState, setState } from '@/State';

interface SynthKeyProps {
  synth: Tone.Synth
  keyboardKey: string
  pitch: string
  keyDown: boolean
  onClick: boolean
  enabled: boolean
}

export function SynthKey({ synth, keyboardKey, pitch, keyDown, onClick, enabled = false }: SynthKeyProps) {
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

  const enabledKey = (
    <button
      className={keyDown || onClick ? styles.keyDown : styles.key}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >{`${pitch} (${keyboardKey})`}</button>
  )

  const disabledKey = (
    <button
      className={keyDown || onClick ? styles.keyDown : styles.key}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled
    >{`${pitch} (${keyboardKey})`}</button>
  )

  if (enabled)
    return enabledKey

  return disabledKey
}
