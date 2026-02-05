export type datesType = {
	id: number
	date: Date
	meta?: metaType
}
export type metaType = {
	price?: number
	startTime: Date
	finishTime: Date
}

export type time = {
	startTime: Date
	finishTime: Date
}
