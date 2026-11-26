import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ProductsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex min-h-svh flex-col">
        <Navbar/>
          <div className="flex-grow">{children}</div>
        <Footer/>
        </div>
    );
}