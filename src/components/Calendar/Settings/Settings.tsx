import { useState, type Dispatch, type SetStateAction } from 'react'
import { getTime } from '../../../utils/dateAction'
import type { datesType, time } from '../CalendarDays/CalendarDays.types'

export function Settings({
	days,
	setDays,
	setSalary,
	salary,
	setTime,
	time,
}: {
	days: datesType[]
	setDays: Dispatch<SetStateAction<datesType[]>>
	setSalary: Dispatch<SetStateAction<number>>
	salary: number
	setTime: Dispatch<SetStateAction<time | undefined>>
	time: time | undefined
}) {
	const [startDay, setStartDay] = useState<string>('')
	const [startTime, setStartTime] = useState<string>('')
	const [endTime, setEndTime] = useState<string>('')
	const [isTemplatePanel, setIsTemplatePanel] = useState<boolean>(false)

	function applyTemplate({ work, rest }: { work: number; rest: number }) {
		let counter = 1
		const [y, m, d] = startDay.split('-')
		const startDate = new Date(Number(y), Number(m) - 1, Number(d), 0, 0, 0)
		const currentStartDay = days.find(
			day => day.date.getTime() == startDate.getTime(),
		)
		if (currentStartDay != undefined) {
			setDays(prev =>
				prev.map(day => {
					if (day.id < currentStartDay?.id) return day
					const isWorkDay = counter <= work

					counter++
					const updateDay = {
						...day,
						meta: isWorkDay
							? {
									price: salary,
									startTime: getTime(time, day).startDate,
									finishTime: getTime(time, day).finishDate,
								}
							: undefined,
					}
					if (counter > work + rest) {
						counter = 1
					}

					return updateDay
				}),
			)
		}
	}

	function saveTime() {
		setTime({
			startTime: startTime,
			finishTime: endTime,
		})
	}
	return (
		<>
			<span>Почасовая ставка: </span>
			<input
				type='number'
				onChange={e =>
					isNaN(Number(e.target.value))
						? setSalary(0)
						: setSalary(Number(e.target.value))
				}
				value={salary}
			/>
			<br />
			<span>Начало дня:</span>
			<input type='time' onChange={e => setStartTime(e.target.value)} />
			<br />
			<span>Конец дня:</span>
			<input type='time' onChange={e => setEndTime(e.target.value)} />
			<br />
			<button onClick={saveTime}>Подтвердить</button>
			<h3 onClick={() => setIsTemplatePanel(!isTemplatePanel)}>
				Шаблоны графиков работы
			</h3>
			{isTemplatePanel ? (
				<>
					<span>Начинать с: </span>
					<input type='date' onChange={e => setStartDay(e.target.value)} />
					<h4>Классические графики</h4>
					<button onClick={() => applyTemplate({ work: 5, rest: 2 })}>
						5/2
					</button>
					<button onClick={() => applyTemplate({ work: 6, rest: 1 })}>
						6/1
					</button>
					<h4>Сменные графики</h4>
					<button onClick={() => applyTemplate({ work: 2, rest: 2 })}>
						2/2
					</button>
					<button onClick={() => applyTemplate({ work: 3, rest: 3 })}>
						3/3
					</button>
					<button onClick={() => applyTemplate({ work: 4, rest: 2 })}>
						4/2
					</button>
					<br />
					<button onClick={() => applyTemplate({ work: 0, rest: 0 })}>
						Очистить
					</button>
				</>
			) : (
				<></>
			)}
		</>
	)
}
