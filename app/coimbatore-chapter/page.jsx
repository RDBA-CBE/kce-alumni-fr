import BackToTop from '@/app/backToTop';
import CoimbatoreChapter from './(coimbatore-chapter)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Coimbatore Chapter',
  description: 'Meet the office bearers of the Karpagam College of Engineering Coimbatore Chapter.',
};

const MembersPage = async () => {
  return (
    <>
      <CoimbatoreChapter />
      <BackToTop />
    </>
  );
};

export default MembersPage;
