import { Request, Response, NextFunction } from 'express';
import { businessLogin } from '../DTO';
import { prisma } from '../helpers';
import { Pass, tokens } from '../helpers';

export const loginBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const parsedBody = businessLogin.safeParse(body);
    if (!parsedBody.success) {
      return res.status(403).json({ message: 'enter required fields' });
    }
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (!existingEmail) {
      return res.status(400).json({ message: 'email is incorrect' });
    }

    const comparePassword = await Pass.password_compare(
      parsedBody.data.password,
      existingEmail.password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: 'password is incorrect' });
    }

    const token = await tokens.create_token(
      parsedBody.data.email,

      existingEmail.promoter_name,
      existingEmail.business_name
    );
    res
      .status(201)
      .json({ message: 'business Login successfully', token: token });
  } catch (error) {
    next(error);
  }
};
