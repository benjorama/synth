import React from 'react';
import styles from '@/styles/Synth.module.css'
import { SynthKey } from './SynthKey';

export class Keyboard extends React.Component {

  constructor(props: any) {
    super(props)
  }

  render(): React.ReactNode {
    return (
      <div
        className={styles.keyboard}
      >
        <SynthKey pitch='C4' />
        <SynthKey pitch='D4' />
        <SynthKey pitch='E4' />
        <SynthKey pitch='F4' />
        <SynthKey pitch='G4' />
        <SynthKey pitch='A4' />
        <SynthKey pitch='B4' />
        <SynthKey pitch='C5' />
      </div>
    )
  }
}
