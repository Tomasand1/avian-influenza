import { Router } from "express";


export default class ApiRouter {
    constructor () {
        this.router = Router({
            caseSensitive: true,
            strict: true,
            mergeParams: true,
        });
    }

    init () {
        return this.router;
    }
}