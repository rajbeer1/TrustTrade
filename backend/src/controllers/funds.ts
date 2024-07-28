import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import pdf from 'pdf-parse';
import { prisma } from '../helpers';
export const AddFunds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.user.email;
    const url = req.body.url;
    console.log(url);

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    const text = data.text;
    console.log(text);
    const extractedData = extractInformation(text);
    if ('message' in extractedData) {
      return res.json(extractedData);
    }
    const userId = await prisma.user.findFirst({
      where: { email: userEmail },select:{id:true}
    })
    if (!userId
    ) {
      return res.status(400).json({ message: 'user not found' });
    }
    const dbEntry = await prisma.funds.create({
      data: {
        name: extractedData.name,
        formNumber: extractedData.formNumber,
        loss: extractedData.loss,
        income: extractedData.income,
        taxPayable: extractedData.taxPayable,
        taxPaid: extractedData.taxPaid,
        userId:userId.id
      },
    });

    res.json(dbEntry);
  } catch (error) {
    next(error);
  }
};
function extractInformation(text) {
  let result = {
    name: '',
    formNumber: '',
    businessLoss: 0,
    totalIncome: 0,
    totalTaxInterestFeePayable: 0,
    taxesPaid: 0,
    accretedIncome: 0,
    additionalTaxInterestPayable: 0,
    taxInterestPaid: 0,
  };
  let output = {
    name: '',
    formNumber: '',
    loss: NaN,
    income: NaN,
    taxPaid: NaN,
    taxPayable: NaN,
  };
  const nameMatch = text.match(/Name([A-Z\s]+)/);
  if (nameMatch) {
    result.name = nameMatch[1]
      .trim()
      .substring(0, nameMatch[1].trim().length - 2);
  }

  const formNumberMatch = text.match(/Form Number([A-Z0-9-]+)/);
  if (formNumberMatch) {
    result.formNumber = formNumberMatch[1].trim();
  }

  const totalIncomeMatch = text.match(/Total Income\s*([\d,]+)/);
  if (totalIncomeMatch) {
    let value = totalIncomeMatch[1].trim().replace(/,/g, '');
    if (result.formNumber === 'ITR-4') {
      result.totalIncome = parseFloat(value) || 0;
    } else {
      result.totalIncome = parseFloat(value.substring(1)) || 0;
    }
  }

  const businessLossMatch = text.match(
    /Current Year business loss, if any\s*([\d,]+)/
  );
  if (businessLossMatch) {
    let value = businessLossMatch[1].trim().replace(/,/g, '');
    result.businessLoss = parseFloat(value.substring(1)) || 0; // Remove leftmost number
  }

  const totalTaxInterestFeePayableMatch = text.match(
    /Total tax, interest and Fee payable\s*([\d,]+)/
  );
  if (totalTaxInterestFeePayableMatch) {
    let value = totalTaxInterestFeePayableMatch[1].trim().replace(/,/g, '');
    result.totalTaxInterestFeePayable = parseFloat(value.substring(1)) || 0; // Remove leftmost number
  }

  const taxesPaidMatch = text.match(/Taxes Paid\s*([\d,]+)/);
  if (taxesPaidMatch) {
    let value = taxesPaidMatch[1].trim().replace(/,/g, '');
    result.taxesPaid = parseFloat(value.substring(1)) || 0; // Remove leftmost number
  }

  const accretedIncomeMatch = text.match(
    /Accreted Income as per section 115TD\s*([\d,]+)/
  );
  if (accretedIncomeMatch) {
    let value = accretedIncomeMatch[1].trim().replace(/,/g, '');
    result.accretedIncome = parseFloat(value.substring(2)) || 0; // Remove first two digits
  }

  const additionalTaxInterestPayableMatch = text.match(
    /Additional Tax and interest payable\s*([\d,]+)/
  );
  if (additionalTaxInterestPayableMatch) {
    let value = additionalTaxInterestPayableMatch[1].trim().replace(/,/g, '');
    result.additionalTaxInterestPayable = parseFloat(value.substring(2)) || 0; // Remove first two digits
  }

  const taxInterestPaidMatch = text.match(/Tax and interest paid\s*([\d,]+)/);
  if (taxInterestPaidMatch) {
    let value = taxInterestPaidMatch[1].trim().replace(/,/g, '');
    result.taxInterestPaid = parseFloat(value.substring(2)) || 0; // Remove first two digits
  }
  output.name = result.name;
  output.formNumber = result.formNumber;
  output.loss = result.businessLoss;
  output.income = result.totalIncome + result.accretedIncome;
  output.taxPaid = result.taxesPaid + result.taxInterestPaid;
  output.taxPayable =
    result.totalTaxInterestFeePayable + result.additionalTaxInterestPayable;
  const validForms = ['ITR-3', 'ITR-4', 'ITR-5', 'ITR-7'];
  if (!validForms.includes(output.formNumber)) {
    return { message: 'document is not valid' };
  }
  return output;
}
