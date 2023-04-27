import React, { KeyboardEvent, useState } from 'react'
import styles from '@/styles/Synth.module.css'
import { PowerButton } from './PowerButton'
import { WhiteKey } from './WhiteKey'
import * as Tone from 'tone'
import { getState, setState } from '@/State'
import { BlackKey } from './BlackKey'
import { getSharp } from '@/Utils'

export function Keyboard() {
  const [power, setPower] = useState<boolean>(false)
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [synthList, setSynthList] = useState<Tone.Synth[]>([])
  const [keysClicked, setKeysClicked] = useState<string[]>([])
  const [octave, setOctave] = useState<number>(4)

  const allowedUserKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'g', 'h', 'w', 'e', 'r', 'i', 'o']
  const whiteKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l']
  const blackKeys = ['w', 'e', '', 'r', 'i', 'o'] // Extra blank char to account for the jump from E to F during iteration
  const pitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

  async function handleClickPowerButton() {
    setPower(!power)

    if (!power) {
      await Tone.start()
      Tone.context.lookAhead = 0.025
      let synths = []
      for (let i = 0; i < 13; i++)
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

      key === 'w' ? synthList[8].triggerAttack(`C#${octave}`) : ''
      key === 'e' ? synthList[9].triggerAttack(`D#${octave}`) : ''
      key === 'r' ? synthList[10].triggerAttack(`F#${octave}`) : ''
      key === 'i' ? synthList[11].triggerAttack(`G#${octave}`) : ''
      key === 'o' ? synthList[12].triggerAttack(`A#${octave}`) : ''

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

      key === 'w' ? synthList[8].triggerRelease() : ''
      key === 'e' ? synthList[9].triggerRelease() : ''
      key === 'r' ? synthList[10].triggerRelease() : ''
      key === 'i' ? synthList[11].triggerRelease() : ''
      key === 'o' ? synthList[12].triggerRelease() : ''

      setKeysPressed(keysPressed.filter(k => k !== key))
    }
  }

  function handleMouse() {
    setKeysClicked(getState().keysClicked)
  }

  const keys = () => {
    let keys: JSX.Element[] = []

    pitches.forEach((pitch, i) => {
      if (pitch.includes('E') || pitch.includes('B')) {
        const keyboardKey = pitch.includes('E') ? 'd' : 'l'

        keys.push(<WhiteKey synth={synthList[0]}
          keyboardKey={keyboardKey}
          pitch={`${pitch}${octave}`}
          keyDown={keysPressed.includes(keyboardKey)}
          onClick={keysClicked.includes(`${pitch}${octave}`)}
          enabled={power}
          key={`${i}_${pitch}${octave}`} />)

      } else {
        keys.push(<WhiteKey synth={synthList[0]}
          keyboardKey={whiteKeys[i]}
          pitch={`${pitch}${octave}`}
          keyDown={keysPressed.includes(whiteKeys[i])}
          onClick={keysClicked.includes(`${pitch}${octave}`)}
          enabled={power}
          key={`${i}_${pitch}${octave}`} />)

        keys.push(<BlackKey synth={synthList[0]}
          keyboardKey={blackKeys[i]}
          pitch={getSharp(`${pitch}${octave}`)}
          keyDown={keysPressed.includes(blackKeys[i])}
          onClick={keysClicked.includes(getSharp(`${pitch}${octave}`))}
          enabled={power}
          key={`${i}_${getSharp(`${pitch}${octave}`)}`} />)
      }
    })

    const nextOctaveC = <WhiteKey synth={synthList[0]}
      keyboardKey={';'}
      pitch={`C${octave + 1}`}
      keyDown={keysPressed.includes(';')}
      onClick={keysClicked.includes(`C${octave + 1}`)}
      enabled={power}
      key={`${pitches.length}_C${octave + 1}`} />

    keys.push(nextOctaveC)

    return keys
  }

  return (
    <div className={styles.parent}>
      <div
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseDown={handleMouse}
        onMouseUp={handleMouse}
        className={styles.keyboardContainer}
      >
        <PowerButton onClick={handleClickPowerButton} power={power} />
        <p>Synth is {synthList.length > 0 ? 'loaded' : 'not loaded: click the red power button'}</p>
        <p>&rsquo;g&rsquo; to decrease the octave, &rsquo;h&rsquo to increase the octave</p>
        <div
          className={power ? styles.keyboardOn : styles.keyboardOff}
        >
          {keys()}
        </div>
      </div>
    </div>
  )
}
