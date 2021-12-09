import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ContactController {

  async store(req: Request, res: Response) {
    const { person_id, type, value } = req.body;

    const newPersonContact = await prisma.contact.create({
      data: {
        personId: Number(person_id),
        value,
        type
      },
    });

    return res.json(newPersonContact);
  }

  async update(req: Request, res: Response) {
    const { person_id, type, value } = req.body;
    const { id } = req.params;

    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        personId: Number(person_id),
        type,
        value
       },
    })


    return res.json(contact);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const contact = await prisma.contact.delete({
      where: { id: Number(id) },
    })

    return res.json(contact);
  }

  async showFromPerson(req: Request, res: Response) {
    const { personId } = req.params

    const contact = await prisma.contact.findMany({
      where: { personId: Number(personId) },
    })

    return res.json(contact);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    })

    return res.json(contact);
  }
}

export default ContactController;