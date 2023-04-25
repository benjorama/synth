import { MouseEventHandler } from 'react'
import styles from '@/styles/Synth.module.css'

interface powerButtonProps {
  onClick: MouseEventHandler
  power: boolean
}

export function PowerButton({ onClick, power }: powerButtonProps) {
  return (
    <div className={power ? styles.powerButtonOn : styles.powerButtonOff} onClick={onClick}>
      <div className={power ? styles.barOn : styles.barOff}>
      </div>
    </div>
  )
}