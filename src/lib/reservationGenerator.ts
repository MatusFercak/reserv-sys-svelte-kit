import { timesConst } from '../lib/constant';

export const ReservationGenerator = {
	getReservations: (dayID, currentDayNow, data: any = []) => {
		let result: any = [];
		for (let time of timesConst) {
			let reservation = data.find(({ $id }) => $id === `${dayID}${time.timeID}`);
			console.log(reservation);
			result = [
				...result,
				{
					reservationID: `${dayID}${time.timeID}`,
					dayID: dayID,
					timeID: time.timeID,
					time: time.time,
					name: reservation ? reservation.name : undefined,
					email: reservation ? reservation.email : undefined,
					isReserv: reservation ? true : false
				}
			];
		}
		console.log(result);
		return result;
	}
};
