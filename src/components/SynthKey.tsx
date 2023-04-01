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
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  async handleMouseDown() {
    //create a synth and connect it to the main output (your speakers)
    if (!this.destination) this.destination = new Tone.Synth().toDestination();
    this.destination.triggerAttack(this.pitch);
  }

  async handleMouseUp() {
    this.destination?.triggerRelease();
  }

  render(): React.ReactNode {
    return (
      <button
        className={styles.key}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >{this.pitch}</button>
    )
  }
}
