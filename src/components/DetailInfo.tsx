
export default function DetailInfo() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
            <div className="mb-6 flex items-center justify-center lg:justify-start">
                <img
                src="https://i.imgur.com/CxMgmcF.png"
                alt="logo"
                className="w-56 sm:w-72 lg:w-80"
                />
            </div>
            <h1 className="mb-5 text-balance text-3xl font-bold leading-tight text-orange-950 sm:text-4xl lg:text-5xl">
            Shopping from Everywhere and Anywhere
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-orange-950/80 sm:text-base">
            {"Kyokara Shopping is your one-stop online destination for convenient and hassle-free shopping. Whether you're at home, work, or on the go, you can easily browse and purchase a wide range of products from the comfort of your device. Enjoy the freedom of shopping whenever and wherever it suits you."}
            </p>
        </div>
        <div className="min-w-0">
            <img
            src="https://i.imgur.com/ifqrBYA.png"
            alt="banner img"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]"
            />
        </div>
        </div>
    </section>
  )
}
