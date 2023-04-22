import { MouseEventHandler } from 'react'
import styles from '@/styles/Synth.module.css'


interface powerButtonProps {
  onClick: MouseEventHandler
  power: boolean
}

export function PowerButton({ onClick, power }: powerButtonProps) {
  return (
    <div className={power ? styles.powerButtonOn : styles.powerButtonOff} onClick={onClick} tabIndex={1}>
      <div className={power ? styles.barOn : styles.barOff} tabIndex={2}>
      </div>
    </div>
  )
}