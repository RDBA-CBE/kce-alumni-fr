import BackToTop from '@/app/backToTop';
import Institution from '../institution/(institution)';
import HelpDeskForm from './(help-desk)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Help Desk',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const HelpDeskFormPage = () => {
  return (
    <>
      <HelpDeskForm />
      <BackToTop />
    </>
  );
};

export default HelpDeskFormPage;
