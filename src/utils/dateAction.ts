import type { Dispatch, SetStateAction } from 'react'
import type {
	datesType,
	time,
} from '../components/Calendar/CalendarDays/CalendarDays.types'

export function handleDateClick(
	id: number,
	days: datesType[], // Типизируем state
	setDays: Dispatch<SetStateAction<datesType[]>>, // Типизируем setState
	salary: number,
	time: time,
	setSelectedDayID: Dispatch<SetStateAction<number | null>>,
	clickTimeoutRef: React.MutableRefObject<number | null>,
	isDoubleClickRef: React.MutableRefObject<boolean>,
) {
	isDoubleClickRef.current = false
	// Создаём таймер чтобы дать шанс на DoubleClick
	clickTimeoutRef.current = window.setTimeout(() => {
		if (isDoubleClickRef.current) return
		const currentDate = days.find(item => item.id == id)

		if (currentDate?.meta != undefined) {
			// Убираем price
			setDays(prev =>
				prev.map(item =>
					item.id === id ? { ...item, meta: undefined } : item,
				),
			)
			setSelectedDayID(currentDate.id)
		} else {
			// Выставляем price
			setDays(prev =>
				prev.map(item =>
					item.id === id
						? {
								...item,
								meta: {
									price: salary,
									startTime: time.startTime,
									finishTime: time.finishTime,
								},
							}
						: item,
				),
			)
			if (typeof currentDate == 'object') {
				setSelectedDayID(currentDate.id)
			}
		}
		console.log(currentDate)
	}, 200)
}
export function handleDateDoubleClick(
	id: number,
	days: datesType[],
	setSelectedDayID: Dispatch<SetStateAction<number | null>>,
	clickTimeoutRef: React.MutableRefObject<number | null>,
	isDoubleClickRef: React.MutableRefObject<boolean>,
) {
	isDoubleClickRef.current = true
	if (clickTimeoutRef.current !== null) {
		clearTimeout(clickTimeoutRef.current)
		clickTimeoutRef.current = null
	}

	const currentDate = days.find(item => item.id === id)
	if (!currentDate) return

	setSelectedDayID(currentDate.id)
	console.log('double click')
}

// export function getTime(
// 	time: time | undefined,
// 	currentDate: datesType | undefined,
// ) {
// 	const [startHours, startMinutes] = time
// 		? time.startTime.split(':').map(Number)
// 		: [8, 0]
// 	const [finishHours, finishMinutes] = time
// 		? time.finishTime.split(':').map(Number)
// 		: [21, 0]

// 	const date = currentDate ? currentDate.date : new Date()

// 	const startDate = new Date(
// 		date.getFullYear(),
// 		date.getMonth(),
// 		date.getDate(),
// 		startHours,
// 		startMinutes,
// 	)
// 	const finishDate = new Date(
// 		date.getFullYear(),
// 		date.getMonth(),
// 		date.getDate(),
// 		finishHours,
// 		finishMinutes,
// 	)
// 	return { startDate, finishDate }
// }
