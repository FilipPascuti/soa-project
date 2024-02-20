// @flow
import express from 'express'
import {resultCodes} from './enums'
import {createTicket, getTicket} from './services'

const ticketRoute = express.Router()

ticketRoute.get('/', function (req, res, next) {
    const userId = req.headers['user-id']
    console.log("-------------------")
    console.log("in the ticket request")
    console.log(userId)

    getTicket(userId)
        .then((tickets) => {
            console.log("great success")
            console.log(tickets)
            res.json({result: resultCodes.SUCCESS, tickets})
        })
        .catch(next)
})

ticketRoute.get('/:id', function (req, res, next) {
    const userId = req.headers['user-id']
    getTicket(userId, req.params.id)
        .then((ticket) => res.json({result: resultCodes.SUCCESS, ticket}))
        .catch(next)
})

ticketRoute.post('/', function (req, res, next) {
    const {title, content} = req.body
    const userId = req.headers['user-id']
    console.log("-------------------")
    console.log("in the post request for the ticket")
    console.log(req.headers)
    console.log(req.headers)

    createTicket(title, content, userId)
        .then((ticket) => {
            console.log("great success")
            console.log(ticket)
            res.status(201).json({result: resultCodes.SUCCESS, ticket})
        })
        .catch(next)
})

export {ticketRoute}
