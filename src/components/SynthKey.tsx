import React from 'react';
import * as Tone from 'tone';
import styles from '@/styles/Synth.module.css'

interface Pitch {
  pitch: string
}

export class SynthKey extends React.Component<Pitch> {
  destination: Tone.Synth<Tone.SynthOptions> | undefined
  pitch: string;

  constructor(props: Pitch) {
    super(props)
    this.pitch = props.pitch
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
  }

  handleMouseDown() {
    //create a synth and connect it to the main output (your speakers)
    if (!this.destination) this.destination = new Tone.Synth().toDestination();
    this.destination.triggerAttack(this.pitch);
  }

  handleDragEnter() {
    //create a synth and connect it to the main output (your speakers)
    if (!this.destination) this.destination = new Tone.Synth().toDestination();
    this.destination.triggerAttack(this.pitch);
  }

  handleMouseUp() {
    this.destination?.triggerRelease();
  }

  handleDragLeave() {
    this.destination?.triggerRelease();
  }

  render(): React.ReactNode {
    return (
      <button
        className={styles.key}
        onMouseDown={this.handleMouseDown}
        onDragEnter={this.handleDragEnter}
        onMouseUp={this.handleMouseUp}
        onDragLeave={this.handleDragLeave}
      >{this.pitch}</button>
    )
  }
}
