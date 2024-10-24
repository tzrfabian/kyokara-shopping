import DetailInfo from "@/components/DetailInfo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProductType } from "@/types/ProductType";
import FeaturedCard from "@/components/FeaturedCard";
import Link from "next/link";
export const dynamic = "force-dynamic"
export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/featured`);
  const products: ProductType[] = await data.json();
  
  return (
    <div>
      <Navbar/>
      <div className="lg:min-h-[560px] bg-orange-200">
        <DetailInfo/>

        <div className="relative opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fc6326" d="M0,96L13.3,122.7C26.7,149,53,203,80,192C106.7,181,133,107,160,74.7C186.7,43,213,53,240,85.3C266.7,117,293,171,320,170.7C346.7,171,373,117,400,128C426.7,139,453,213,480,224C506.7,235,533,181,560,170.7C586.7,160,613,192,640,181.3C666.7,171,693,117,720,128C746.7,139,773,213,800,229.3C826.7,245,853,203,880,160C906.7,117,933,75,960,69.3C986.7,64,1013,96,1040,122.7C1066.7,149,1093,171,1120,186.7C1146.7,203,1173,213,1200,186.7C1226.7,160,1253,96,1280,96C1306.7,96,1333,160,1360,176C1386.7,192,1413,160,1427,144L1440,128L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"></path></svg>
        </div>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-center bg-orange-300/50 rounded-2xl p-5 text-orange-950">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <FeaturedCard product={product} key={i}/>
          ))}
        </div>
      </div>
      </div>


      <div className="bg-gradient-to-t from-orange-500 to-orange-200 font-sans px-6 py-12">
        <div className="container mx-auto flex flex-col justify-center items-center text-center">
          <h2 className="text-orange-600 sm:text-4xl text-3xl font-bold mb-4">
            Discover Our New Collection
          </h2>
          <p className="text-gray-700 text-base text-center mb-8">
            Elevate your style with our latest arrivals. Shop now and enjoy exclusive
            discounts!
          </p>
          <Link href={'/products'}>
            <button
              type="button"
              className="bg-white text-sm text-gray-700-600 font-semibold py-3 px-6 rounded-lg hover:bg-orange-300"
            >
              See More
            </button>
          </Link>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
