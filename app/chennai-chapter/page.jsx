import BackToTop from '@/app/backToTop';
import ChennaiChapter from './(chennai-chapter)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Chennai Chapter',
  description: 'Meet the office bearers of the Karpagam College of Engineering Chennai Chapter.',
};

const MembersPage = async () => {
  return (
    <>
      <ChennaiChapter />
      <BackToTop />
    </>
  );
};

export default MembersPage;
