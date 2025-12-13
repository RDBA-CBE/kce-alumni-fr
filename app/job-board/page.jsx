import JobBoard from './(job-board)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Job Board',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const JobBoardPage = async () => {
  return (
    <>
      <JobBoard />
      <BackToTop />
    </>
  );
};

export default JobBoardPage;
