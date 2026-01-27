import type { Dispatch, SetStateAction } from 'react'
import type { datesType } from '../components/Calendar/CalendarDays/CalendarDays.types'

export function handleDateClick(
	id: number,
	days: datesType[], // Типизируем state
	setDays: Dispatch<SetStateAction<datesType[]>>, // Типизируем setState
) {
	if (days.find(item => item.id == id)?.meta != undefined) {
		// Выставляем price
		setDays(
			days.map(item => (item.id === id ? { ...item, meta: undefined } : item)),
		)
	} else {
		// Убираем price
		setDays(
			days.map(item =>
				item.id === id ? { ...item, meta: { price: 2200 } } : item,
			),
		)
	}
}
