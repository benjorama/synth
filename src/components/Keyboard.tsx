import React, { KeyboardEvent, useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { SynthKey } from './SynthKey'
import * as Tone from 'tone'
import { getState, setState } from '@/State'

export function Keyboard() {
  const [power, setPower] = useState<boolean>(false)
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [synthList, setSynthList] = useState<Tone.Synth[]>([])
  const [keysClicked, setKeysClicked] = useState<string[]>([])

  const allowedUserKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']

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
    const key = e.key.toLowerCase()
    if (!keysPressed.includes(key) && allowedUserKeys.includes(key)) {

      key === 'a' ? synthList[0].triggerAttack('C4') : ''
      key === 's' ? synthList[1].triggerAttack('D4') : ''
      key === 'd' ? synthList[2].triggerAttack('E4') : ''
      key === 'f' ? synthList[3].triggerAttack('F4') : ''
      key === 'j' ? synthList[4].triggerAttack('G4') : ''
      key === 'k' ? synthList[5].triggerAttack('A4') : ''
      key === 'l' ? synthList[6].triggerAttack('B4') : ''
      key === ';' ? synthList[7].triggerAttack('C5') : ''

      setKeysPressed([...keysPressed, key])
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase()

    if (keysPressed.includes(key) && allowedUserKeys.includes(key)) {

      key === 's' ? synthList[1].triggerRelease() : ''
      key === 'a' ? synthList[0].triggerRelease() : ''
      key === 'd' ? synthList[2].triggerRelease() : ''
      key === 'f' ? synthList[3].triggerRelease() : ''
      key === 'j' ? synthList[4].triggerRelease() : ''
      key === 'k' ? synthList[5].triggerRelease() : ''
      key === 'l' ? synthList[6].triggerRelease() : ''
      key === ';' ? synthList[7].triggerRelease() : ''

      setKeysPressed(keysPressed.filter(k => k !== key))
    }
  }

  function handleMouse() {
    setKeysClicked(getState().keysClicked)
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouse}
      onMouseUp={handleMouse}
    >
      <PowerButton onClick={handleClickPowerButton} power={power} />
      <p>Synth is {synthList.length > 0 ? 'loaded' : 'not loaded: click the red power button'}</p>
      <div
        className={styles.keyboard}
      >
        <SynthKey synth={synthList[0]} keyboardKey="a" pitch="C4" keyDown={keysPressed.includes('a')} onClick={keysClicked.includes('C4')} />
        <SynthKey synth={synthList[1]} keyboardKey="s" pitch="D4" keyDown={keysPressed.includes('s')} onClick={keysClicked.includes('D4')} />
        <SynthKey synth={synthList[2]} keyboardKey="d" pitch="E4" keyDown={keysPressed.includes('d')} onClick={keysClicked.includes('E4')} />
        <SynthKey synth={synthList[3]} keyboardKey="f" pitch="F4" keyDown={keysPressed.includes('f')} onClick={keysClicked.includes('F4')} />
        <SynthKey synth={synthList[4]} keyboardKey="j" pitch="G4" keyDown={keysPressed.includes('j')} onClick={keysClicked.includes('G4')} />
        <SynthKey synth={synthList[5]} keyboardKey="k" pitch="A4" keyDown={keysPressed.includes('k')} onClick={keysClicked.includes('A4')} />
        <SynthKey synth={synthList[6]} keyboardKey="l" pitch="B4" keyDown={keysPressed.includes('l')} onClick={keysClicked.includes('B4')} />
        <SynthKey synth={synthList[7]} keyboardKey=";" pitch="C5" keyDown={keysPressed.includes(';')} onClick={keysClicked.includes('C5')} />
      </div>
    </div>
  )
}
