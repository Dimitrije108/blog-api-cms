import { useNavigation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Spinner from "../components/Spinner";

export default function Layout() {
  const navigation = useNavigation();
  // Check for loading state
  const isLoading = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <div className="mx-auto lg:max-w-[90rem] h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Header />
      <main className="pl-10 pr-10 pb-14">
        {isLoading
          ? <Spinner />
          : <Outlet />
        }
      </main>
    </div>
  )
};
