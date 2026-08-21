import { Outlet } from "react-router";
import {
  AnnounceBar,
  Footer,
  FreeEbookButton,
  Header,
  Newsletter,
  ScrollTopButton
} from "../components";
import { ToastContainer } from "react-toastify";

export function Layout() {
  return (
    <>
      <AnnounceBar />
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
      <FreeEbookButton />
      <ScrollTopButton />
      <ToastContainer />
    </>
  )
}