import { AnnounceBar, Footer, Header, Newsletter } from "./components";

import "./App.css";

function App() {
  return (
    <>
      <AnnounceBar />
      <Header />
      {/* MAIN PAGE CONTENT HERE */}
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;