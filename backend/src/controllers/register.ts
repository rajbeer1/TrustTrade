import { Request, Response, NextFunction } from 'express';
import { businessSignup } from '../DTO';
import { prisma } from '../helpers';
import { Pass, tokens } from '../helpers';

export const registerBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const parsedBody = businessSignup.safeParse(body);


    if (!parsedBody.success) {
      return res.status(403).json({ message: 'enter required fields' });
    }
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (existingEmail) {
      return res.status(400).json({ message: 'email already exists' });
    }
    const businessRegistred = await prisma.user.findFirst({
      where: {
        AND: [
          { business_name: parsedBody.data.business_name.toLowerCase() },
          { promoter_name: parsedBody.data.promoter_name.toLowerCase() },
        ],
      },
    });

    if (businessRegistred) {
      return res.status(400).json({ message: 'business already added' });
    }
    const hashedPassword = await Pass.password_crypt(parsedBody.data.password);
       await prisma.user.create({
      data: {

        email: parsedBody.data.email,
        password: hashedPassword,
        business_name: parsedBody.data.business_name.toLowerCase(),
        promoter_name: parsedBody.data.promoter_name.toLowerCase(),
      },
    });
    const token = await tokens.create_token(
      parsedBody.data.email,

      parsedBody.data.promoter_name,
      parsedBody.data.business_name
    );
    res
      .status(201)
      .json({ message: 'business registered successfully', token: token });
  } catch (error) {
    next(error);
  }
};
