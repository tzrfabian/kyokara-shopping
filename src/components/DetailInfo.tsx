
export default function DetailInfo() {
  return (
    <div className="max-w-7xl w-full mx-auto py-16">
        <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
        <div>
            <div className="flex justify-center items-center">
                <img
                src="https://i.imgur.com/CxMgmcF.png"
                alt="logo"
                className="w-80"
                />
            </div>
            <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">
            Shopping from Everywhere and Anywhere
            </h1>
            <p className="text-base leading-relaxed">
            {"Kyokara Shopping is your one-stop online destination for convenient and hassle-free shopping. Whether you're at home, work, or on the go, you can easily browse and purchase a wide range of products from the comfort of your device. Enjoy the freedom of shopping whenever and wherever it suits you."}
            </p>
        </div>
        <div className="max-lg:mt-12 h-full">
            <img
            src="https://i.imgur.com/ifqrBYA.png"
            alt="banner img"
            className="w-full h-full object-cover"
            />
        </div>
        </div>
    </div>
  )
}
