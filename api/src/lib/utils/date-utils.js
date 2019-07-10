import moment from 'moment';

// TODO: create date validation
export class ObjectUtils {
    static getFormatedDate(date) {
        let formatedDate = moment(date).format('DD/MM/YYYY');
        if (formatedDate.isValid()) {
            return formatedDate;
        }
        throw Error('Date provided is not valid');
    }
}
