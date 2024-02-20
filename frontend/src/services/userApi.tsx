import {authConfig, baseUrl, withLogs} from "../core";
import axios from "axios";
import {Ticket} from "./ticket";

const ticketsUrl = `http://${baseUrl}/ticket`

export const getTickets: (token: string) => Promise<{ tickets:Ticket[]}> =
    token => {
        console.log(authConfig(token));
        return withLogs(axios.get<any>('http://localhost:80/ticket/', authConfig(token)), "getTickets")
    }

export const createTicket: (token: string, ticket: Ticket) => Promise<any> =
    (token, ticket) => {
        return withLogs(axios.post<any>('http://localhost:80/ticket/', ticket, authConfig(token)), "getTickets")
    }


