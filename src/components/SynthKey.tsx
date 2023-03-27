import React from 'react';
import * as Tone from 'tone';
import styles from '@/styles/Synth.module.css'

interface Note {
  pitch: string;
  duration: string;
}

export class SynthKey extends React.Component<Note> {
  destination: Tone.Synth<Tone.SynthOptions> | undefined
  duration: string;
  pitch: string;

  constructor(props: Note) {
    super(props)
    this.pitch = props.pitch
    this.duration = props.duration
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    //create a synth and connect it to the main output (your speakers)
    if (!this.destination) this.destination = new Tone.Synth().toDestination();
    this.destination.triggerAttackRelease(this.pitch, this.duration);
  }

  render(): React.ReactNode {
    return (
      <button
        className={styles.button}
        onClick={this.handleClick}
      >{this.pitch}</button>
    )
  }
}
