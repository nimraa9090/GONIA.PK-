export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[80vh] flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h2 className="text-6xl font-light mb-4">Minimalist Elegance</h2>
          <p className="text-xl mb-8">Discover our new collection of luxury essentials.</p>
          <a href="/shop" className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition">
            Shop Now
          </a>
        </div>
      </section>
      
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition duration-500" />
              </div>
              <h4 className="font-medium">Product Name {i}</h4>
              <p className="text-gray-500">$120.00</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
