import BackToTop from '@/app/backToTop';
import BangaloreChapter from './(bangalore-chapter)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Bangalore Chapter',
  description: 'Meet the office bearers of the Karpagam College of Engineering Bangalore Chapter.',
};

const MembersPage = async () => {
  return (
    <>
      <BangaloreChapter />
      <BackToTop />
    </>
  );
};

export default MembersPage;
