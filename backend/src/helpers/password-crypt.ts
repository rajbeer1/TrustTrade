import bcryptjs from 'bcryptjs';

class Password {
  public password_crypt = async (password) => {
    const sa = await bcryptjs.genSalt(10);
    const hashedpassword = bcryptjs.hash(password, sa);
    return hashedpassword;
  };
   public password_compare = async (password, hashedpassword) => {
    const compare = await bcryptjs.compare(password, hashedpassword);
    return compare;
  };
}

export const Pass: Password = new Password();