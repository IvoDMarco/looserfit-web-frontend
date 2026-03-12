import { getProducts } from '@/app/actions/product';
import { HomeClient } from '@/components/home/HomeClient';

export default async function Home() {
  const res = await getProducts();
  const products = res.success && res.products ? res.products : [];

  // Show only the 4 most recently created products for the New Arrivals section
  const newArrivals = products.slice(0, 4);

  return <HomeClient newArrivals={newArrivals} />;
}
