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
        <div className="flex min-h-svh flex-col">
        <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
          </div>
        </ProtectedComponent>
    );
}