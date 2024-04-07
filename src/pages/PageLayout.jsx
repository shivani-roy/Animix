import { Footer, Header } from "../components";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default PageLayout;
