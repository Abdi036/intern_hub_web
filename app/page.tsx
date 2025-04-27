import Navbar from "@/_components/Navbar";
import Hero from "@/_components/Hero";
import Footer from "@/_components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
