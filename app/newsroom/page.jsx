import BackToTop from '@/app/backToTop';
import NewsRoom from './(newsroom)';

export const metadata = {
  title: 'Karpagam Institute Of Technology - Newsroom',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const NewsRoomPage = () => {
  return (
    <>
      <NewsRoom />

      <BackToTop />
    </>
  );
};

export default NewsRoomPage;
