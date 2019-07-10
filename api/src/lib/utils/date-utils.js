import moment from 'moment';

// TODO: create date validation
export class DateUtils {
    static getFormatedDate(date) {
        if (date !== null) {
            let formatedDate = moment(date, 'DD/MM/YYYY', true);
            if (formatedDate.isValid()) {
                return formatedDate;
            }
            throw Error('Date provided is not valid');
        }

        return null;
    }
}
