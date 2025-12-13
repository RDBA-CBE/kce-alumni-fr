import BackToTop from '@/app/backToTop';
import MyBasicDetails from './(edit-basic-profile)';

export const metadata = {
  title: 'Karpagam Institute Of Technology - Profile',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const MyBasicDetailsPage = async () => {
  return (
    <>
      <MyBasicDetails />
      <BackToTop />
    </>
  );
};

export default MyBasicDetailsPage;
