import BackToTop from './backToTop';
// import HomePage from "./01-main-demo/page";
import HomePage from './home/page';

export const metadata = {
  title: 'Karpagam Institute Of Technology ',
  description: 'Karpagam Institute Of Technology ',
};

export default function Home() {
  return (
    <main>
      <HomePage />

      <BackToTop />
    </main>
  );
}
