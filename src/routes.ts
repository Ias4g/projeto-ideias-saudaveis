import express from 'express';
import { prisma } from './prisma';
import { PrismaIdeiasRepository } from './repositories/prisma/prisma-ideias-repository';
import { SubmitIdeiaUseCase } from './use-cases/submit-ideia-use-case';

export const routes = express.Router()

routes.get('/', async (req, res) => {
    const users = await prisma.ideias.findMany()

    const reversedIdeas = [...users].reverse()
    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render('index.html', { ideas: lastIdeas })
})

routes.get('/ideias', async (req, res) => {
    const users = await prisma.ideias.findMany()

    const reversedIdeas = [...users].reverse()
    return res.render('ideias.html', { ideas: reversedIdeas })

})

routes.post('/', async (req, res) => {
    const { image, title, category, description, link } = req.body
    const prismaIdeiasRepository = new PrismaIdeiasRepository()
    const submitIdeiaUseCase = new SubmitIdeiaUseCase(
        prismaIdeiasRepository
    )

    await submitIdeiaUseCase.execute({
        image,
        title,
        category,
        description,
        link
    })

    return res.redirect('/')
})