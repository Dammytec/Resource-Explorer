
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Automatically redirect to /characters?page=1
  redirect('/characters?page=1');
}
