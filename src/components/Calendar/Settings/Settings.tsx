import { useState, type Dispatch, type SetStateAction } from 'react'
import type { time } from '../CalendarDays/CalendarDays.types'

export function Settings({
	setSalary,
	salary,
	setTime,
}: {
	setSalary: Dispatch<SetStateAction<number>>
	salary: number
	setTime: Dispatch<SetStateAction<time | undefined>>
}) {
	const [startTime, setStartTime] = useState<string>('')
	const [endTime, setEndTime] = useState<string>('')

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
		</>
	)
}
