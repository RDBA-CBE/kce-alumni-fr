import MyEvents from './(my-events)';

export const metadata = {
  title: 'Karpagam College Of Engineering - Events',
  description: 'Online Courses & Education NEXTJS14 Template',
};

const EventsPage = async () => {
  return (
    <>
      <MyEvents />
    </>
  );
};

export default EventsPage;
