import BackToTop from '@/app/backToTop';
import AsiaPacificChapter from './(asia-pacific-chapter)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Asia Pacific Chapter',
  description: 'Meet the office bearers of the Karpagam College of Engineering Asia Pacific Chapter.',
};

const AsiaPacificChapterPage = async () => {
  return (
    <>
      <AsiaPacificChapter />
      <BackToTop />
    </>
  );
};

export default AsiaPacificChapterPage;
