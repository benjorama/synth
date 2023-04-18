import styles from '@/styles/Synth.module.css'
import { MouseEventHandler } from 'react'

interface powerButtonProps {
  onClick: MouseEventHandler
  power: boolean
}

export function PowerButton({ onClick, power }: powerButtonProps) {
  return (
    <button
      className={power ? styles.powerOn : styles.powerOff}
      onClick={onClick}
    >Power</button>
  )
}
