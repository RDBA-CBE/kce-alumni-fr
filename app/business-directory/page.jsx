import BusinessDirectory from './(business-directory)';
import BackToTop from '@/app/backToTop';

export const metadata = {
  title: 'Karpagam College Of Engineering - Business Directory',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const BusinessDirectoryPage = async () => {
  return (
    <>
      <BusinessDirectory />
      <BackToTop />
    </>
  );
};

export default BusinessDirectoryPage;
