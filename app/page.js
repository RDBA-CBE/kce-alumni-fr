import BackToTop from './backToTop';
// import HomePage from "./01-main-demo/page";
import HomePage from './home/page';

export const metadata = {
  title: 'Karpagam College Of Engineering ',
  description: 'Karpagam College Of Engineering ',
};

export default function Home() {
  return (
    <main>
      <HomePage />

      <BackToTop />
    </main>
  );
}
