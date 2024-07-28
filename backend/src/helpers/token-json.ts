import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config/config';
class JWT {
  public create_token = async (email: string, owner: string, business = '') => {
    const token = jsonwebtoken.sign({ email, owner, business }, config.JWT_SECRET, {
      expiresIn: '48h',
    });
    return token;
  }; 
}

export const tokens: JWT = new JWT();
