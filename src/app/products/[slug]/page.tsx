import { ProductType } from "@/types/ProductType";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
  const { slug } = await props.params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`);
  const product: ProductType = await data.json();

  return (
    <main className="min-w-0 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 items-start gap-6 rounded-2xl bg-white p-4 shadow-md sm:gap-8 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-10 lg:p-8">
          <div className="min-w-0 text-center">
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-orange-50 p-4 sm:min-h-96 sm:p-8">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="max-h-[28rem] w-full rounded-lg object-contain"
              />
            </div>
            <div className="mx-auto mt-4 flex max-w-full flex-wrap justify-center gap-3 sm:mt-6 sm:gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="flex h-16 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-sm sm:h-20 sm:w-20 sm:p-3"
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0 self-center">
            <h1 className="text-balance text-2xl font-extrabold capitalize text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <h2 className="mb-2 mt-6 font-bold text-gray-900">Description</h2>
            <p className="leading-7 text-gray-600">{product.excerpt}</p>
            <h2 className="mb-2 mt-6 font-bold text-gray-900">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  className="rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-800"
                  key={index}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="mt-6 text-2xl font-bold text-gray-900 sm:mt-8 sm:text-3xl">
              Rp. {product.price}
            </p>
            <div className="mt-6 sm:mt-8">
              <AddToWishlistBtn productId={product._id.toString()} />
            </div>
          </div>
        </div>
        <section
          className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:mt-8 sm:p-6"
          aria-labelledby="product-information-heading"
        >
          <h2 id="product-information-heading" className="text-lg font-bold text-gray-900 sm:text-xl">
            Product information
          </h2>
          <div className="my-4 leading-7 text-gray-600 sm:my-5">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
