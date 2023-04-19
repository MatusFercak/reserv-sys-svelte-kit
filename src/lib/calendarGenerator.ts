import { daysConst, monthNames } from '../lib/constant';

export const CalendarGenerator = {
	getCalendar: (
		year: number = new Date().getFullYear(),
		month: number = new Date().getMonth(),
		startDayIndex: number = 0
	): Array<{
		dayNumber: number;
		dayID: string;
		dayIndex: number;
		dayNameShort: string;
		dayNameLong: string;
		monthIndex: number;
		yearRes: number;
		inCurrentMonth: boolean;
	}> => {
		let result: Array<any> = [];

		const previousMonth: number = new Date(year, month, 0);
		const currentMonth: number = new Date(year, month + 1, 0);
		const nextMonth: number = new Date(year, month + 2, 0);
		const numberOfDaysInPreviousMonth: number = previousMonth.getDate();
		const numberOfDaysInCurrentMonth: number = currentMonth.getDate();
		const startingDayOfCurrentMonth: number = new Date(year, month, 1).getDay();
		const endingDayOfCurrentMonth: number = new Date(
			year,
			month,
			numberOfDaysInCurrentMonth
		).getDay();

		//days in previousMonth
		for (let day = startingDayOfCurrentMonth - 1; day >= 0; day--) {
			let dayNumber: number = numberOfDaysInPreviousMonth - day;
			let past: boolean =
				new Date(previousMonth.getFullYear(), previousMonth.getMonth(), dayNumber) >=
				new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
			let dayIndex: number = new Date(
				previousMonth.getFullYear(),
				previousMonth.getMonth(),
				dayNumber
			).getDay();
			let date = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), dayNumber);
			let dayNameShort: string = new Date(
				previousMonth.getFullYear(),
				previousMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'short' });
			let dayNameLong: string = new Date(
				previousMonth.getFullYear(),
				previousMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'long' });
			let monthIndex: number = previousMonth.getMonth();
			let yearRes: number = previousMonth.getFullYear();
			let dayID: string = `${year}${monthIndex + 1 < 10 ? '0' : ''}${monthIndex + 1}${
				dayNumber + 1 < 10 ? '0' : ''
			}${dayNumber}`;
			let inCurrentMonth: boolean = false;
			result = [
				...result,
				{
					past,
					date,
					dayNumber,
					dayID,
					dayIndex,
					dayNameShort,
					dayNameLong,
					monthIndex,
					yearRes,
					inCurrentMonth
				}
			];
		}

		// days in currentMonth
		for (let day = 1; day <= numberOfDaysInCurrentMonth; day++) {
			let dayNumber: number = day;
			let past: boolean =
				new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber) >=
				new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
			let dayIndex: number = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				dayNumber
			).getDay();
			let date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
			let dayNameShort: string = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'short' });
			let dayNameLong: string = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'long' });
			let monthIndex: number = currentMonth.getMonth();
			let yearRes: number = currentMonth.getFullYear();
			let dayID: string = `${year}${monthIndex + 1 < 10 ? '0' : ''}${monthIndex + 1}${
				dayNumber + 1 < 10 ? '0' : ''
			}${dayNumber}`;
			let inCurrentMonth: boolean = true;
			result = [
				...result,
				{
					past,
					date,
					dayNumber,
					dayID,
					dayIndex,
					dayNameShort,
					dayNameLong,
					monthIndex,
					yearRes,
					inCurrentMonth
				}
			];
		}

		// days in nextMonth
		for (let day = 1; day <= 6 - endingDayOfCurrentMonth; day++) {
			let dayNumber: number = day;
			let past: boolean =
				new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dayNumber) >=
				new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
			let dayIndex: number = new Date(
				nextMonth.getFullYear(),
				nextMonth.getMonth(),
				dayNumber
			).getDay();
			let date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dayNumber);
			let dayNameShort: string = new Date(
				nextMonth.getFullYear(),
				nextMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'short' });
			let dayNameLong: string = new Date(
				nextMonth.getFullYear(),
				nextMonth.getMonth(),
				dayNumber
			).toLocaleString('default', { weekday: 'long' });
			let monthIndex: number = nextMonth.getMonth();
			let yearRes: number = nextMonth.getFullYear();
			let dayID: string = `${year}${monthIndex + 1 < 10 ? '0' : ''}${monthIndex + 1}${
				dayNumber + 1 < 10 ? '0' : ''
			}${dayNumber}`;
			let inCurrentMonth: boolean = false;
			result = [
				...result,
				{
					past,
					date,
					dayNumber,
					dayID,
					dayIndex,
					dayNameShort,
					dayNameLong,
					monthIndex,
					yearRes,
					inCurrentMonth
				}
			];
		}

		console.log(result);

		return result;
	}
};
