import BackToTop from '@/app/backToTop';
import ApplicantDetail from '../(id)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Members',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const ApplicantDetailPage = async () => {
  return (
    <>
      <ApplicantDetail />
      <BackToTop />
    </>
  );
};

export default ApplicantDetailPage;
