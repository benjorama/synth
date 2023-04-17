import React from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'

export function Keyboard() {
  return (
    <div>
      <PowerButton />
      <div
        className={styles.keyboard}
      >
        <SynthKey />
      </div>
    </div>
  )
}
