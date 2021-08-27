import { instance } from "../services";
import moment from "moment";

const currentYear = moment().format('YYYY');

export default class IndicatorsServices {
    static async getAll() {
        const ENDPOINT = '/api'
        return await instance.get(ENDPOINT);
    }

    static async getByType(type: string) {
        const ENDPOINT = `api/${type}`
        return await instance.get(ENDPOINT);
    }

    static async getByTypeAndYear(type: string) {
        const ENPOINT = `api/${type}/${currentYear}`
        return await instance.get(ENPOINT);
    }

}