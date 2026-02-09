import { useState } from 'react'
import styles from './Calendar.module.css'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { CalendarDays } from './CalendarDays/CalendarDays'
import type { datesType, time } from './CalendarDays/CalendarDays.types'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'
import { Settings } from './Settings/Settings'
import { TemplateSettings } from './Settings/TemplateSettings/TemplateSettings'

export function Calendar() {
	const [days, setDays] = useState<datesType[]>([])
	const [selectedDayId, setSelectedDayID] = useState<number | null>(null)
	const [time, setTime] = useState<time>({
		startTime: new Date(),
		finishTime: new Date(),
	})
	const [salary, setSalary] = useState<number>(141)
	const currentDay = days.find(day => day.id === selectedDayId)
	return (
		<main>
			<div className={styles.calendar}>
				<div className={styles['calendar__wrapper']}>
					<div className={styles['calendar__block-main']}>
						<CalendarHeader />
						<div className='sep'></div>
						<CalendarDays
							days={days}
							setDays={setDays}
							time={time}
							salary={salary}
							setSelectedDayID={setSelectedDayID}
						/>
					</div>
					<div className={styles['settings__block']}>
						<Settings
							days={days}
							setDays={setDays}
							setTime={setTime}
							salary={salary}
							setSalary={setSalary}
							currentDay={currentDay}
						/>
						<TemplateSettings
							days={days}
							setDays={setDays}
							salary={salary}
							time={time}
						/>
					</div>
				</div>
				<div>
					<CalendarDay day={currentDay} />
				</div>
			</div>
		</main>
	)
}
