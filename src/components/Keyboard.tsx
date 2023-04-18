import React, { useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'

export function Keyboard() {
  const [power, setPower] = useState<boolean>(false)
  const [synth, setSynth] = useState<Tone.Synth | undefined>(undefined)

  function handleClickPowerButton() {
    console.log(synth)
    setPower(!power)
    if (!power)
      setSynth(new Tone.Synth().toDestination())
    else {
      synth?.dispose()
      setSynth(undefined)
    }
  }

  return (
    <div>
      <PowerButton onClick={handleClickPowerButton} power={power} />
      <p>Synth is {synth ? 'loaded' : 'not loaded: click the red power button'}</p>
      <div
        className={styles.keyboard}
      >
        <SynthKey />
      </div>
    </div>
  )
}
