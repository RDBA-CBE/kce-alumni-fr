import Members from './(members)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Members',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const MembersPage = async () => {
  return (
    <>
      <Members />
      <BackToTop />
    </>
  );
};

export default MembersPage;
