import React, { useState } from 'react';
import styles from '@/styles/Synth.module.css'
import * as Tone from 'tone'

interface SynthKeyProps {
  synth: Tone.Synth
  keyboardKey: string
  pitch: string
  keyDown: boolean
}

export function SynthKey({ synth, keyboardKey, pitch, keyDown }: SynthKeyProps) {
  function handleMouseDown() {
    synth.triggerAttack(pitch)
  }

  function handleMouseUp() {
    synth.triggerRelease()
  }

  return (
    <button
      className={keyDown ? styles.keyDown : styles.key}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >{`${pitch} (${keyboardKey})`}</button>
  )
}
