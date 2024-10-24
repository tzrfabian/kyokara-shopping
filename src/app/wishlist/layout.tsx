import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProtectedComponent from "@/components/ProtectedComponent";

export default function WishlistLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <ProtectedComponent>
        <div className="flex flex-col min-h-screen">
        <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
          </div>
        </ProtectedComponent>
    );
}