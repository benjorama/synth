import React from 'react';
import styles from '@/styles/Synth.module.css'
import * as Tone from 'tone'

interface SynthKeyProps {
  synth: Tone.Synth | undefined
  keyboardKey: string
  pitch: string
  duration: string
}

export function SynthKey({ synth, keyboardKey, pitch, duration }: SynthKeyProps) {
  function handleClick() {
    synth ? synth.triggerAttackRelease(pitch, duration) : ''
  }

  return (
    <button
      className={styles.key}
      onClick={handleClick}
    >{`${pitch} (${keyboardKey})`}</button>
  )
}
