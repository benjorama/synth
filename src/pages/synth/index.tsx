import Head from 'next/head'
import { SynthKey } from '../../components/SynthKey'

export default function SynthPage() {
  return (
    <>
      <Head>
        <title>Synth Page</title>
      </Head>
      <main>
        <h1>Synth Page</h1>
        <SynthKey pitch='C4' duration='1n' />
        <SynthKey pitch='D4' duration='1n' />
        <SynthKey pitch='E4' duration='1n' />
        <SynthKey pitch='F4' duration='1n' />
        <SynthKey pitch='G4' duration='1n' />
      </main>
    </>
  )
}
