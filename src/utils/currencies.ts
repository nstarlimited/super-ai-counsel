export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export const getCurrencyByCountry = (countryCode: string): Currency => {
  const currencyMap: { [key: string]: Currency } = {
    'US': currencies[0],
    'NG': currencies[1],
    'EU': currencies[2],
    'GB': currencies[3],
    'IN': currencies[4],
  };
  return currencyMap[countryCode] || currencies[0];
};