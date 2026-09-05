import Banner from "./components/homepage/Banner";
import Featured from "./components/homepage/Featured";
import ContactUs from "./components/homepage/ContactUs";
import Footer from "./components/homepage/Footer";

export default function Home() {
  return (
    <main>
      <Banner/>
      <Featured/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
