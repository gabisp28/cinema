import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Retorno'
})

server.post('/filme', (request, reply) => {

//const body = request.body//
//console.log(body)//
   
const {nome, diretor, minutosduracao} = request.body
    database.create({
        nome: nome,
        diretor: diretor,
        minutosduracao: minutosduracao
    })

    //console.log(database.list)
    return reply.status(201).send()
})

server.get('/filme', (request) => {
    const search = request.query.search

    console.log(search)

    const filmes = database.list(search)

    return filmes
})

server.put('/filmes/:id', (request, reply) => {

    const filmeId = request.params.id
    const {nome, diretor, minutosduracao} = request.body
    const filme = database.update(filmeId, {
        nome,
        diretor,
        minutosduracao,
    })
    return reply.status(204).send()
})

server.delete('/filmes/:id', (request, reply) => {
    const filmeId = request.params.id

    database.delete(filmeId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})