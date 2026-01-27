import { CalendarDays } from './CalendarDays/CalendarDays'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'

export function Calendar() {
	return (
		<main>
			<CalendarHeader />
			<CalendarDays />
		</main>
	)
}
