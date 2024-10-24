import { ProductType } from "@/types/ProductType";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`);
  const product: ProductType = await data.json();

  return {
    title: product.name,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: `Thumbnail image of ${product.name}`,
        },
      ],
    },
  };
}

export default async function ProductPerSlug(props: Props) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${props.params.slug}`);
  const product: ProductType = await data.json();
  
  return (
<div className="font-sans bg-white">
  <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
      <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
        <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
          <img
            src={product.thumbnail}
            alt="Product img"
            className="w-3/4 rounded object-cover mx-auto"
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
          {product.images.map((img, i) => {
            return(
                <div 
                key={i}
                className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer">
                  <img
                    src={img}
                    alt="img list"
                    className="w-full"
                  />
                </div>
            )
          })}
        </div>
      </div>
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-extrabold text-gray-800 capitalize">
          {product.name}
        </h2>
        <p className="text-black font-bold mt-6">Description:</p>
        <p className="text-gray-500">{product.excerpt}</p>
        <p className="text-black font-bold mt-6">Tags:</p>
        {product.tags.map((tag, i) => {
          return (
            <p className="text-blue-500" key={i}>#{tag}</p>
          )
        })}
        <div className="flex flex-wrap gap-4 mt-8">
          <p className="text-gray-800 text-3xl font-bold">Rp. {product.price}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <AddToWishlistBtn productId={product._id.toString()}/>
        </div>
      </div>
    </div>
    <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
      <h3 className="text-xl font-bold text-gray-800">Product information</h3>
      <div className="my-5">
        <p>{product.description}</p>
      </div>
    </div>
    
  </div>
</div>

  )
}
