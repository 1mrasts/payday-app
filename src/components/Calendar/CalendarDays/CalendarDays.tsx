import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { handleDateClick } from '../../../utils/dateAction'
import styles from './CalendarDays.module.css'
import type { datesType, time } from './CalendarDays.types'

export function CalendarDays({
	days,
	setDays,
	salary,
	time,
	setSelectedDayID,
}: {
	days: datesType[]
	setDays: Dispatch<SetStateAction<datesType[]>>
	salary: number
	time: time | undefined
	setSelectedDayID: Dispatch<SetStateAction<number | null>>
}) {
	// Получаем нашу текущую дату
	const [currentDate] = useState<Date>(new Date())
	useEffect(() => {
		const startDays: datesType[] = []

		// Получаем первый день месяца по текущей дате
		const firstDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1,
		)
		// Получаем день недели этого дня
		const dayOfWeek = firstDayOfMonth.getDay()
		// Создаём удобную систему индексов для понедельника (чтобы понедельник == 0, а не 1)
		const mondayBasedIndex = (dayOfWeek + 6) % 7
		// Создаём копию данных чтобы не трогать firstDayOfMonth
		const startDate = new Date(firstDayOfMonth)
		// Выставляем дату ближайшего понедельника
		startDate.setDate(firstDayOfMonth.getDate() - mondayBasedIndex)

		for (let i = 0; i < 42; i++) {
			// Составляем дату календаря (сразу начинается с ближайшего понедельника)
			const date = new Date(startDate)
			// Выставляем дату, каждый раз повышая на 1 день (начиная с нуля)
			date.setDate(startDate.getDate() + i)

			// Пушим в массив который после будем выводить
			startDays.push({
				id: startDays.length != 0 ? startDays[startDays.length - 1].id + 1 : 0,
				date: date,
			})
		}
		setDays(startDays)
	}, [currentDate, setDays])

	return (
		<div className={styles['calendar__menu']}>
			{days.map(item => {
				const isToday =
					item.date.getDate() == currentDate.getDate() &&
					item.date.getDay() == currentDate.getDay() &&
					item.date.getMonth() == currentDate.getMonth()

				const hasPrice = item?.meta !== undefined

				let className = ''

				if (isToday && hasPrice) {
					className = `${styles['today']} ${styles['prices']}`
				} else if (isToday) {
					className = `${styles['today']}`
				} else if (hasPrice) {
					className = `${styles['prices']}`
				}

				return (
					<span
						className={className}
						key={item.id}
						onClick={() =>
							handleDateClick(
								item.id,
								days,
								setDays,
								salary,
								time,
								setSelectedDayID,
							)
						}
					>
						{item.date.getDate()}
					</span>
				)
			})}
		</div>
	)
}
