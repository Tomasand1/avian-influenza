import moment from 'moment';

export class DateUtils {
    static validateDate(date) {
        if (date !== null) {
            if (date.isValid()) {
                return date;
            }
        }
        return false;
    }

    static getFormatedDate(date) {
        try {
            const formatedDate = moment(date, 'DD/MM/YYYY', true);

            const validatedDate = DateUtils.validateDate(formatedDate);

            if (!validatedDate) throw Error('Date provided is not valid');

            return validatedDate;
        } catch (err) {
            console.log(err);
        }
    }
}
