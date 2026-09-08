import { Outlet } from "react-router";
import {
  Footer,
  Header,
  Newsletter,
  ScrollTopButton
} from "../components";
import { ToastContainer } from "react-toastify";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
      <ScrollTopButton />
      <ToastContainer />
    </>
  )
}