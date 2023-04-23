import Head from 'next/head'
import { Keyboard } from '@/components/Keyboard'

export default function SynthPage() {
  return (
    <>
      <Head>
        <title>Synth Page</title>
      </Head>
      <main>
        <div id="title">
          <div></div>
          <h1>Synth Page</h1>
        </div>
        <Keyboard />
      </main>
    </>
  )
} // TODO: Create Component for Title
