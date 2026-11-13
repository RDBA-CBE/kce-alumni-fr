import AlumniAwards from './(alumni-awards)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Alumni Awards',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const MembersPage = async () => {
  return (
    <>
      <AlumniAwards />
      <BackToTop />
    </>
  );
};

export default MembersPage;
