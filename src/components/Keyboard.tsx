import React, { useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'

export function Keyboard() {
  const [power, setPower] = useState<boolean>(false)
  const [synthList, setSynth] = useState<Tone.Synth[]>([])

  async function handleClickPowerButton() {
    setPower(!power)

    if (!power) {
      await Tone.start()
      console.log('audio is ready')
      let synths = []
      for (let i = 0; i < 8; i++)
        synths.push(new Tone.Synth().toDestination())
      setSynth(synths)

    } else {
      synthList.forEach(synth => synth.dispose())
      setSynth([])
    }
  }

  return (
    <div
    >
      <PowerButton onClick={handleClickPowerButton} power={power} />
      <p>Synth is {synthList.length > 0 ? 'loaded' : 'not loaded: click the red power button'}</p>
      <div
        className={styles.keyboard}
      >
        <SynthKey synth={synthList[0]} keyboardKey="a" pitch="C4" duration='8n' />
        <SynthKey synth={synthList[1]} keyboardKey="s" pitch="D4" duration='8n' />
      </div>
    </div>
  )
}
