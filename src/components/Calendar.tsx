import { useState } from 'react'
import styles from './Calendar.module.css'

export type Event = {
  start: { hour: number; minute: number }
  end: { hour: number; minute: number }
  title: string
  // location: string
}

export default function Calendar({ events }: { events: { [day: string]: Event[] } }) {
  const [monday, _setMonday] = useState(() => {
    const now = new Date()

    if (now.getDay() === 0) {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
    }

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.hourColumn} />
        {[...Array(7)].map((_, i) => {
          const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)

          return (
            <div
              className={`${styles.day} ${date.toDateString() === new Date().toDateString() ? styles.today : ''}`}
              key={i}
            >
              <div className={styles.dayName}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className={styles.dayNumber}>{date.getDate()}</div>
            </div>
          )
        })}
        <div className={styles.scrollSpacer} />
      </div>
      <div className={styles.body}>
        <div className={styles.hourColumn}>
          {[...Array(23)].map((_, i) => (
            <div className={styles.hourLabel} key={i}>
              {i + 1}:00
            </div>
          ))}
        </div>
        {[...Array(7)].map((_, i) => (
          <div className={styles.column} key={i}>
            {[...Array(24)].map((_, i) => (
              <div className={styles.hour} key={i} />
            ))}
            {events[
              new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i).toISOString().substring(0, 10)
            ]?.map((event, i) => {
              return (
                <div
                  className={styles.event}
                  key={i}
                  style={{
                    top: `${(event.start.hour + event.start.minute / 60) * 40}px`,
                    height: `${
                      (event.end.hour - event.start.hour + (event.end.minute - event.start.minute) / 60) * 40
                    }px`,
                  }}
                >
                  <span className={styles.eventTitle}>{event.title}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
