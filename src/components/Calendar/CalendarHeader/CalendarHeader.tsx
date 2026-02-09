import styles from './CalendarHeader.module.css'

export function CalendarHeader() {
	const weekDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
	return (
		<div className={styles['calendar__header']}>
			{weekDay.map((item, index) => (
				<span key={index}>{item}</span>
			))}
		</div>
	)
}
