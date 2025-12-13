import BackToTop from '@/app/backToTop';
import ApplicantDetail from '../(id)';

export const metadata = {
  title: 'Karpagam Institute Of Technology - Members',
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
