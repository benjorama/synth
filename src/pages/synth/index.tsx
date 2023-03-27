import Head from 'next/head'
import { SynthKey } from '../../components/SynthKey'
import styles from '@/styles/Synth.module.css'

export default function SynthPage() {
  return (
    <>
      <Head>
        <title>Synth Page</title>
      </Head>
      <main>
        <h1>Synth Page</h1>
        <div className={styles.keyboard}>
          <SynthKey pitch='C4' duration='1n' />
          <SynthKey pitch='D4' duration='1n' />
          <SynthKey pitch='E4' duration='1n' />
          <SynthKey pitch='F4' duration='1n' />
          <SynthKey pitch='G4' duration='1n' />
          <SynthKey pitch='A4' duration='1n' />
          <SynthKey pitch='B4' duration='1n' />
          <SynthKey pitch='C5' duration='1n' />
        </div>
      </main>
    </>
  )
}
