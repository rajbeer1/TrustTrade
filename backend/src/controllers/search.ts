import { prisma } from "../helpers";
import {Request,Response,NextResponse} from 'express'
export const Search =async (req: Request, res: Response, next:NextResponse) => {
  try {
    const { query } = req.query;

    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { business_name: { contains: query, mode: 'insensitive' } },
          { promoter_name: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        business_name: true,
        promoter_name: true,
        sumAssured: true,
        safetyRating: true,
  
      },
      take: 10,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error searching users' });
  }
}