import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PersonController {

  async store(req: Request, res: Response) {
    const { name, surname } = req.body;

    const newPerson = await prisma.person.create({
      data: {
        name,
        surname,
      },
    });

    return res.json(newPerson);
  }

  async index(req: Request, res: Response) {
    const persons = await prisma.person.findMany()

    return res.json(persons);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const person = await prisma.person.findUnique({
      where: { id: Number(id) },
    })

    return res.json(person);
  }

  async update(req: Request, res: Response) {
    const { name, surname } = req.body;
    const { id } = req.params;

    const person = await prisma.person.update({
      where: { id: Number(id) },
      data: {
        name,
        surname
       },
    })

    return res.json(person);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const contacts = await prisma.contact.deleteMany({
      where: { personId: Number(id) },
    })

    const person = await prisma.person.delete({
      where: { id: Number(id) },
    })

    return res.json(person);
  }
}

export default PersonController;