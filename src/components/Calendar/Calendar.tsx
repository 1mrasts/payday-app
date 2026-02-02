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
	const [currentDay, setCurrentDay] = useState<datesType | undefined>(undefined)
	const [time, setTime] = useState<time>()
	const [salary, setSalary] = useState<number>(141)
	return (
		<main>
			<div className={styles.calendar}>
				<div className={styles['calendar__main']}>
					<CalendarHeader />
					<CalendarDays
						days={days}
						setDays={setDays}
						salary={salary}
						setCurrentDay={setCurrentDay}
					/>
				</div>
				<div>
					<CalendarDay
						day={currentDay}
						setTime={setTime}
						setDays={setDays}
						time={time}
						days={days}
					/>
				</div>
			</div>
			<CalendarInfo days={days} />
			<Settings setSalary={setSalary} />
		</main>
	)
}
