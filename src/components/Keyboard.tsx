import React, { KeyboardEvent, useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'

export function Keyboard() {
  const [power, setPower] = useState<boolean>(false)
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [synthList, setSynthList] = useState<Tone.Synth[]>([])

  async function handleClickPowerButton() {
    setPower(!power)

    if (!power) {
      await Tone.start()
      let synths = []
      for (let i = 0; i < 8; i++)
        synths.push(new Tone.Synth().toDestination())
      setSynthList(synths)

    } else {
      synthList.forEach(synth => synth.dispose())
      setSynthList([])
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!keysPressed.includes(e.key)) {
      e.key === 'a' ? synthList[0].triggerAttack('C4') : ''
      e.key === 's' ? synthList[1].triggerAttack('D4') : ''
      e.key === 'd' ? synthList[2].triggerAttack('E4') : ''
      e.key === 'f' ? synthList[3].triggerAttack('F4') : ''
      e.key === 'j' ? synthList[4].triggerAttack('G4') : ''
      e.key === 'k' ? synthList[5].triggerAttack('A4') : ''
      e.key === 'l' ? synthList[6].triggerAttack('B4') : ''
      e.key === ';' ? synthList[7].triggerAttack('C5') : ''
      setKeysPressed([...keysPressed, e.key])
      console.log(keysPressed)
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (keysPressed.includes(e.key)) {
      e.key === 'a' ? synthList[0].triggerRelease() : ''
      e.key === 's' ? synthList[1].triggerRelease() : ''
      e.key === 'd' ? synthList[2].triggerRelease() : ''
      e.key === 'f' ? synthList[3].triggerRelease() : ''
      e.key === 'j' ? synthList[4].triggerRelease() : ''
      e.key === 'k' ? synthList[5].triggerRelease() : ''
      e.key === 'l' ? synthList[6].triggerRelease() : ''
      e.key === ';' ? synthList[7].triggerRelease() : ''
      setKeysPressed(keysPressed.filter(key => key !== e.key))
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <PowerButton onClick={handleClickPowerButton} power={power} />
      <p>Synth is {synthList.length > 0 ? 'loaded' : 'not loaded: click the red power button'}</p>
      <div
        className={styles.keyboard}
      >
        <SynthKey synth={synthList[0]} keyboardKey="a" pitch="C4" keyDown={keysPressed.includes('a')} />
        <SynthKey synth={synthList[1]} keyboardKey="s" pitch="D4" keyDown={keysPressed.includes('s')} />
        <SynthKey synth={synthList[2]} keyboardKey="d" pitch="E4" keyDown={keysPressed.includes('d')} />
        <SynthKey synth={synthList[3]} keyboardKey="f" pitch="F4" keyDown={keysPressed.includes('f')} />
        <SynthKey synth={synthList[4]} keyboardKey="j" pitch="G4" keyDown={keysPressed.includes('j')} />
        <SynthKey synth={synthList[5]} keyboardKey="k" pitch="A4" keyDown={keysPressed.includes('k')} />
        <SynthKey synth={synthList[6]} keyboardKey="l" pitch="B4" keyDown={keysPressed.includes('l')} />
        <SynthKey synth={synthList[7]} keyboardKey=";" pitch="C5" keyDown={keysPressed.includes(';')} />
      </div>
    </div>
  )
}
