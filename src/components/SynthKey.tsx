import * as Tone from 'tone'

export interface SynthKeyProps {
    synth: Tone.Synth
    keyboardKey: string
    pitch: string
    keyDown: boolean
    onClick: boolean
    enabled: boolean
  }