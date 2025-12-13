import Home from './(home)';
import { getAllPostsMeta } from '@/mdx';

export const metadata = {
  title: 'Karpagam College Of Engineering ',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const HomePage = async () => {
  const blog = await getAllPostsMeta();
  return (
    <>
      <Home getBlog={blog} />
    </>
  );
};

export default HomePage;
