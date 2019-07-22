import {v4 as uuid} from "uuid"

export class StringUtils{
    
    static isEmpty(text) {
        return !text || !text.length;
    }

    static getUuid(){
        return uuid();
    }

    static getGuid(){
        return StringUtils.getUuid().toUpperCase();
    }
}