import { useState } from 'react'
import styles from './Calendar.module.css'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarDays } from './CalendarDays/CalendarDays'
import type { datesType, time } from './CalendarDays/CalendarDays.types'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'
import { CalendarInfo } from './CalendarInfo/CalendarInfo'
import { Settings } from './Settings/Settings'

export function Calendar() {
	const [days, setDays] = useState<datesType[]>([])
	const [selectedDayId, setSelectedDayID] = useState<number | null>(null)
	const [time, setTime] = useState<time>()
	const [salary, setSalary] = useState<number>(141)
	const currentDay = days.find(d => d.id === selectedDayId)
	return (
		<main>
			<div className={styles.calendar}>
				<div className={styles['calendar__main']}>
					<CalendarHeader />
					<CalendarDays
						days={days}
						setDays={setDays}
						time={time}
						salary={salary}
						setSelectedDayID={setSelectedDayID}
					/>
				</div>
				<div>
					<CalendarDay day={currentDay} />
				</div>
			</div>
			<CalendarInfo days={days} />
			<br />
			<Settings
				days={days}
				setDays={setDays}
				setSalary={setSalary}
				salary={salary}
				setTime={setTime}
				time={time}
			/>
		</main>
	)
}
