import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getConversations = async (req: Request, res: Response) => {
  console.log("calling")

  try {
    const { email } = req.params;

    const conversations = await prisma.conversation.findMany({
      where: { userEmail: email  },
      include: {
        messages: true,  
      },
      orderBy: {
        createdAt: 'desc',  
      },
    });

    res.json(conversations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.error(error)
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
      console.error(error)
    }
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body;

    const newConversation = await prisma.conversation.create({
      data: {
        userEmail: userEmail,
      },
    });

    const botMessage = await prisma.message.create({
      data: {
        conversationId: newConversation.id,
        isUser: false,  
        text: 'How may I help you?', 
      },
    });
    const updatedConversation = await prisma.conversation.findUnique({
      where: { id: newConversation.id },
      include: { messages: true }, 
    });
    res.status(201).json(updatedConversation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: error.message });
    } else {
      console.error(error)
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    await prisma.message.deleteMany({
      where: { conversationId: conversationId },
    });

    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const switchConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        createdAt: new Date(),  
      },
    });

    res.json(updatedConversation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

