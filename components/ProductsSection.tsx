import { Package } from "lucide-react";

const products = [
  {
    name: "Health Packages",
    desc: "Comprehensive health checkup and annual wellness packages",
    price: "From PKR 5,000",
  },
  {
    name: "Lab Services",
    desc: "Complete laboratory tests and diagnostic services",
    price: "PKR 500 onwards",
  },
  {
    name: "Prescription Delivery",
    desc: "Medicines delivered to your doorstep",
    price: "Free delivery",
  },
  {
    name: "Home Care",
    desc: "Professional medical care services at home",
    price: "From PKR 2,000",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
            Our Offerings
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Healthcare Products & Services
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            We offer a variety of healthcare products and services tailored to your needs.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-md hover:border-[#1677ff]/20"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#eff6ff] text-[#1677ff]">
                <Package size={28} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{product.name}</h3>
              <p className="mt-3 text-sm text-slate-600">{product.desc}</p>
              <p className="mt-5 font-bold text-[#1677ff]">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
