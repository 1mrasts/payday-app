import type { datesType } from '../CalendarDays/CalendarDays.types'

export function CalendarInfo({ days }: { days: datesType[] }) {
	function getFullSum() {
		let sum = 0

		days
			.filter(item => item.meta != undefined)
			.forEach(
				item =>
					item.meta != undefined &&
					item.meta.price &&
					(sum +=
						((item.meta.finishTime.getTime() - item.meta.startTime.getTime()) /
							3600000) *
						item.meta.price),
			)
		return sum < 0 ? sum * -1 : sum
	}

	return (
		<>
			<span>Сумма в месяц: {getFullSum()}</span>
		</>
	)
}
