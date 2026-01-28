import { useState } from 'react'
import { CalendarDays } from './CalendarDays/CalendarDays'
import type { datesType } from './CalendarDays/CalendarDays.types'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'
import { CalendarInfo } from './CalendarInfo/CalendarInfo'

export function Calendar() {
	const [days, setDays] = useState<datesType[]>([])
	return (
		<main>
			<CalendarHeader />
			<CalendarDays days={days} setDays={setDays} />
			<CalendarInfo days={days} />
		</main>
	)
}
