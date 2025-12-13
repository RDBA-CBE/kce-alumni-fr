import Applicants from '../(id)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Members',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const ApplicantsPage = async () => {
  return (
    <>
      <Applicants />
      <BackToTop />
    </>
  );
};

export default ApplicantsPage;
