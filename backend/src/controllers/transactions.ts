import { Request, Response, NextResponse } from 'express';
import { prisma } from '../helpers';
import { newTransaction } from '../DTO';
export const initiateTransaction = async (
  req: Request,
  res: Response,
  next: NextResponse
) => {
  try {
    const buyerEmail = req.user.email;
    const data = req.body;
    const parsed = newTransaction.safeParse(data);
    console.log(parsed.success);
    if (!parsed.success) {
      return res.status(403).json({ message: 'enter required fields' });
    }
    const buyerID = await prisma.user.findFirst({
      where: {
        email: buyerEmail,
      },
      select: { id: true },
    });
    const sellerID = await prisma.user.findFirst({
      where: {
        email: parsed.data.sellerEmail,
      },
      select: { id: true },
    });

    if (!buyerID || !sellerID) {
      return res.status(400).json({ message: 'seller or buyer not found' });
    }
    await prisma.transaction.create({
      data: {
        buyerId: buyerID.id,
        sellerId: sellerID.id,
        amount: parsed.data.amount,
        date: parsed.data.date,
        status: 'PENDING',
      },
    });
    return res.status(200).json({ message: 'transaction initiated' });
  } catch (error) {
    next(error);
  }
};

export const getBuyerTransaction = async (
  req: Request,
  res: Response,
  next: NextResponse
) => {
  try {
    const email = req.user.email;
    const buyerID = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: { id: true },
    });
    const entries = await prisma.transaction.findMany({
      where: {
        buyerId: buyerID?.id,
      },
      orderBy: {
        date: 'desc',
      },
      take: 10,
    });
    if (!entries || entries.length === 0) {
      return res.status(200).json([]);
    }
    const sellerIds = [...new Set(entries.map((entry) => entry.sellerId))];

    const sellers = await prisma.user.findMany({
      where: {
        id: { in: sellerIds },
      },
      select: { id: true, business_name: true },
    });

    const sellerMap = sellers.reduce((acc, seller) => {
      acc[seller.id] = seller.business_name;
      return acc;
    }, {});

    const updatedEntries = entries.map((entry) => {
      const sellerName = sellerMap[entry.sellerId];

      const date = new Date(entry.date);
      const monthYear = date.toLocaleString('default', {
        day: '2-digit',
        month: 'long',
      });

      return {
        id: entry.id,
        date: monthYear,
        amount: entry.amount,
        status: entry.status,
        sellerName: sellerName,
      };
    });
    console.log(updatedEntries);
    res.send(updatedEntries);
  } catch (error) {
    next(error);
  }
};
export const getSellerTransaction = async (
  req: Request,
  res: Response,
  next: NextResponse
) => {
  try {
    const email = req.user.email;

    const sellerID = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: { id: true },
    });

    const entries = await prisma.transaction.findMany({
      where: {
        sellerId: sellerID?.id,
      },
      take: 10,
      orderBy: {
        date: 'desc',
      },
    });
    if (!entries || entries.length === 0) {
      return res.status(200).json([]);
    }

    const buyerIds = [...new Set(entries.map((entry) => entry.buyerId))];

    const buyers = await prisma.user.findMany({
      where: {
        id: { in: buyerIds },
      },
      select: { id: true, business_name: true },
    });

    const sellerMap = buyers.reduce((acc, buyer) => {
      acc[buyer.id] = buyer.business_name;
      return acc;
    }, {});

    const updatedEntries = entries.map((entry) => {
      const buyerName = sellerMap[entry.buyerId];

      const date = new Date(entry.date);
      const monthYear = date.toLocaleString('default', {
        month: 'long',
        day: '2-digit',
      });

      return {
        id: entry.id,
        date: monthYear,
        amount: entry.amount,
        status: entry.status,
        buyerName: buyerName,
      };
    });
    console.log(updatedEntries);
    res.send(updatedEntries);
  } catch (error) {
    next(error);
  }
};
