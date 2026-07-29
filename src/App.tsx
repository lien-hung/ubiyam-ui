import {
  AnnounceBar,
  Footer,
  FreeEbookButton,
  Header,
  Newsletter,
  ScrollTopButton
} from "./components";

import "./App.css";

function App() {
  return (
    <>
      <AnnounceBar />
      <Header />
      {/* MAIN PAGE CONTENT HERE */}
      <Newsletter />
      <Footer />
      <FreeEbookButton />
      <ScrollTopButton />
    </>
  );
}

export default App;