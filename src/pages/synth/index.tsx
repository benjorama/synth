import Head from 'next/head'
import { Keyboard } from '@/components/Keyboard'

export default function SynthPage() {
  return (
    <>
      <Head>
        <title>Synth Page</title>
      </Head>
      <main>
        <h1>Synth Page</h1>
        <Keyboard />
      </main>
    </>
  )
}
