import BackToTop from '@/app/backToTop';
import GulfChapter from './(gulf-chapter)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Gulf Chapter',
  description: 'Meet the office bearers of the Karpagam College of Engineering Gulf Chapter.',
};

const MembersPage = async () => {
  return (
    <>
      <GulfChapter />
      <BackToTop />
    </>
  );
};

export default MembersPage;
