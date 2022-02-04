import { DashboardLayout } from "../layouts";

const Home = () => {
  return <div>Bienvenid@</div>;
};

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Home;
