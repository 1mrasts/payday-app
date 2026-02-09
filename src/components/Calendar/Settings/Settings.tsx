import { useState, type Dispatch, type SetStateAction } from 'react'
import type { datesType, time } from '../CalendarDays/CalendarDays.types'
import styles from './Settings.module.css'
import dayCountI from '/src/assets/Settings/Day-count.svg'
import setEndDayI from '/src/assets/Settings/Set-end-day.svg'
import setSalaryI from '/src/assets/Settings/Set-salary.svg'
import setStartDayI from '/src/assets/Settings/Set-start-day.svg'

export function Settings({
	days,
	setDays,
	setTime,
	salary,
	setSalary,
	currentDay,
}: {
	days: datesType[]
	setDays: Dispatch<SetStateAction<datesType[]>>
	setTime: Dispatch<SetStateAction<time>>
	salary: number
	setSalary: Dispatch<SetStateAction<number>>
	currentDay: datesType | undefined
}) {
	const [startTime, setStartTime] = useState<string>('')
	const [endTime, setEndTime] = useState<string>('')
	const today = new Date()

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

	function getWorkDayCount() {
		return days.filter(
			item =>
				item.meta?.price != undefined &&
				item.date.getMonth() + 1 == today.getMonth() + 1,
		).length
	}

	function saveTime(currentDate: datesType | undefined) {
		const [startHours, startMinutes] = startTime.split(':').map(Number)
		const [finishHours, finishMinutes] = endTime.split(':').map(Number)

		const date = currentDate ? currentDate.date : new Date()

		const startDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			startHours,
			startMinutes,
		)
		const finishDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			finishHours,
			finishMinutes,
		)

		setTime({
			startTime: startDate,
			finishTime: finishDate,
		})

		setDays(prev =>
			prev.map(item =>
				item.id == currentDate?.id
					? {
							...item,
							meta: {
								...item.meta,
								price: salary,
								startTime: startDate,
								finishTime: finishDate,
							},
						}
					: item,
			),
		)
	}

	return (
		<div className='calendar__block width-48'>
			<div className='calendar__title'>
				<h5>Сумма в месяц: {getFullSum()}</h5>
				<div className='calendar__col'>
					<img src={dayCountI} alt='' />
					<span>Рабочих дней в месяц: {getWorkDayCount()}</span>
				</div>
			</div>
			<div className='sep'></div>
			<div className={styles['calendar__settings']}>
				<div className={styles['calendar__settings-body']}>
					<div className='calendar__col'>
						<img src={setSalaryI} alt='' />
						<span>Почасовая ставка: </span>
						<input
							type='number'
							onChange={e =>
								isNaN(Number(e.target.value))
									? setSalary(0)
									: setSalary(Number(e.target.value))
							}
							placeholder='141'
							value={salary}
						/>
					</div>
					<div className='calendar__col'>
						<img src={setStartDayI} alt='' />
						<span>Начало дня:</span>
						<input type='time' onChange={e => setStartTime(e.target.value)} />
					</div>
					<div className='calendar__col'>
						<img src={setEndDayI} alt='' />
						<span>Конец дня:</span>
						<input type='time' onChange={e => setEndTime(e.target.value)} />
					</div>
				</div>
				<div className={styles['calendar__settings-button']}>
					<button onClick={() => saveTime(currentDay)}>
						Сохранить настройки
					</button>
				</div>
			</div>
		</div>
	)
}
