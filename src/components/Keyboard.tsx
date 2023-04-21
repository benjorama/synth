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
  const [octave, setOctave] = useState<number>(4)

  const allowedUserKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'g', 'h']

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

      key === 'a' ? synthList[0].triggerAttack(`C${octave}`) : ''
      key === 's' ? synthList[1].triggerAttack(`D${octave}`) : ''
      key === 'd' ? synthList[2].triggerAttack(`E${octave}`) : ''
      key === 'f' ? synthList[3].triggerAttack(`F${octave}`) : ''
      key === 'j' ? synthList[4].triggerAttack(`G${octave}`) : ''
      key === 'k' ? synthList[5].triggerAttack(`A${octave}`) : ''
      key === 'l' ? synthList[6].triggerAttack(`B${octave}`) : ''
      key === ';' ? synthList[7].triggerAttack(`C${octave + 1}`) : ''
      key === 'g' ? setOctave(octave - 1) : ''
      key === 'h' ? setOctave(octave + 1) : ''

      setKeysPressed([...keysPressed, key])
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase()

    if (keysPressed.includes(key) && allowedUserKeys.includes(key)) {

      key === 'a' ? synthList[0].triggerRelease() : ''
      key === 's' ? synthList[1].triggerRelease() : ''
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
        <SynthKey synth={synthList[0]} keyboardKey="a" pitch={`C${octave}`} keyDown={keysPressed.includes('a')} onClick={keysClicked.includes(`C${octave}`)} />
        <SynthKey synth={synthList[1]} keyboardKey="s" pitch={`D${octave}`} keyDown={keysPressed.includes('s')} onClick={keysClicked.includes(`D${octave}`)} />
        <SynthKey synth={synthList[2]} keyboardKey="d" pitch={`E${octave}`} keyDown={keysPressed.includes('d')} onClick={keysClicked.includes(`E${octave}`)} />
        <SynthKey synth={synthList[3]} keyboardKey="f" pitch={`F${octave}`} keyDown={keysPressed.includes('f')} onClick={keysClicked.includes(`F${octave}`)} />
        <SynthKey synth={synthList[4]} keyboardKey="j" pitch={`G${octave}`} keyDown={keysPressed.includes('j')} onClick={keysClicked.includes(`G${octave}`)} />
        <SynthKey synth={synthList[5]} keyboardKey="k" pitch={`A${octave}`} keyDown={keysPressed.includes('k')} onClick={keysClicked.includes(`A${octave}`)} />
        <SynthKey synth={synthList[6]} keyboardKey="l" pitch={`B${octave}`} keyDown={keysPressed.includes('l')} onClick={keysClicked.includes(`B${octave}`)} />
        <SynthKey synth={synthList[7]} keyboardKey=";" pitch={`C${octave + 1}`} keyDown={keysPressed.includes(';')} onClick={keysClicked.includes(`C${octave + 1}`)} />
      </div>
    </div>
  )
}
