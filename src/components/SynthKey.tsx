import React, { useState } from 'react';
import styles from '@/styles/Synth.module.css'
import * as Tone from 'tone'
import { getState, setState } from '@/state';

interface SynthKeyProps {
  synth: Tone.Synth
  keyboardKey: string
  pitch: string
  keyDown: boolean
  onClick: boolean
}

export function SynthKey({ synth, keyboardKey, pitch, keyDown, onClick }: SynthKeyProps) {
  function handleMouseDown() {
    synth.triggerAttack(pitch)
    setState({ keysClicked: getState().keysClicked.concat([pitch]) })
  }

  function handleMouseUp() {
    synth.triggerRelease()
    setState({ keysClicked: getState().keysClicked.filter(i => i !== pitch) })
  }

  return (
    <button
      className={keyDown || onClick ? styles.keyDown : styles.key}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >{`${pitch} (${keyboardKey})`}</button>
  )
}
