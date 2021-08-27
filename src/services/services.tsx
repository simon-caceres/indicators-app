import axios from 'axios';
import { base } from "../utils/api";

export const instance = axios.create({
    baseURL: base,
})