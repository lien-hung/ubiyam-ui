import {
  AnnounceBar,
  Footer,
  FreeEbookButton,
  Header,
  Newsletter
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
    </>
  );
}

export default App;