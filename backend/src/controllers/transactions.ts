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
    console.log(data);
    const parsed = newTransaction.safeParse(data);

    if (!parsed.success) {
      return res.status(403).json({ message: 'enter required fields' });
    }
    const buyerID = await prisma.user.findFirst({
      where: {
        email: buyerEmail,
      },
      select: { id: true, sumAssured: true },
    });

    const sellerID = await prisma.user.findFirst({
      where: {
        id: parsed.data.id,
      },
      select: { id: true, sumAssured: true },
    });

    if (!buyerID || !sellerID) {
      return res.status(200).json({ message: 'seller or buyer not found' });
    }
    if (
      parsed.data.amount > sellerID?.sumAssured ||
      parsed.data.amount > buyerID?.sumAssured
    ) {
      return res.status(200).json({ message: 'Insufficient Sum assured' });
    }
    await prisma.transaction.create({
      data: {
        buyerId: buyerID.id,
        sellerId: sellerID.id,
        amount: parsed.data.amount,
        date: parsed.data.date,
        invoice : data.invoice,
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

    res.send(updatedEntries);
  } catch (error) {
    next(error);
  }
};

export const getPendingTransactionsn = async (
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
        status: 'PENDING',
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

    const buyerMap = buyers.reduce((acc, buyer) => {
      acc[buyer.id] = buyer.business_name;
      return acc;
    }, {});

    const response = entries.map((entry) => {
      const date = new Date(entry.date);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}`;
      return {
        id:entry.id,
        amount: entry.amount,
        business_name: buyerMap[entry.buyerId],
        date: formattedDate,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export const approvePendingTransactions = async (
  req: Request,
  res: Response,
  next: NextResponse
) => {
  try {
    const { id, type } = req.body;
    console.log(id)
    const change = await prisma.transaction.update({
      where: { id: id },
      data: {
        status: type,
      }
     
    })
     res.send({ message: 'Approved' });
  } catch (error) {
    next(error);
  }
};
