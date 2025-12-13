import Applicants from '../(id)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam Institute Of Technology - Members',
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
