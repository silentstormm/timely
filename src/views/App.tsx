import Calendar, { Event } from '../components/Calendar'
import styles from './App.module.css'

function App() {
  const events: { [day: string]: Event[] } = {
    '2023-12-19': [
      { start: { hour: 10, minute: 0 }, end: { hour: 11, minute: 0 }, title: 'Breakfast with Simon' },
      { start: { hour: 11, minute: 0 }, end: { hour: 12, minute: 30 }, title: 'Daily standup meeting' },
      { start: { hour: 14, minute: 0 }, end: { hour: 15, minute: 0 }, title: 'Lunch with Timothy' },
    ],
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Timely</div>
      <Calendar events={events} />
      <div />
    </div>
  )
}

export default App
