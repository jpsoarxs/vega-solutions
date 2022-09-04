import * as moment from 'moment';

export class CustomDate {
	moment: moment.Moment;

	constructor(date?: moment.MomentInput) {
		this.moment = moment(date);
	}
}

export const customDateFactory = (date?: moment.MomentInput) =>
	new CustomDate(date).moment;
