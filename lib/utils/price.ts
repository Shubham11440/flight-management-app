export function calculatePriceDifference(oldPrice: number, newPrice: number): number {
  return newPrice - oldPrice;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
