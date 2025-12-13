import Chapters from './(chapters)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Business Directory',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const ChaptersPage = async () => {
  return (
    <>
      <Chapters />
      <BackToTop />
    </>
  );
};

export default ChaptersPage;
