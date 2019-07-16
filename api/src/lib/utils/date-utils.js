import moment from 'moment';

export class DateUtils {
    static getFormatedDate(date) {
        const formatedDate = moment(date, 'DD/MM/YYYY', true);

        const validatedDate = validatedDate(formatedDate);

        if (!validatedDate) throw Error('Date provided is not valid');

        return validatedDate;
    }

    static validateDate(date) {
        if (date !== null) {
            if (date.isValid()) {
                return date;
            }
        }
        return false;
    }
}
