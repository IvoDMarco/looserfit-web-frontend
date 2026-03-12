import { AboutUsSection } from "@/components/home/AboutUsSection";

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 mb-12 text-center">
        <h1 className="font-heading text-5xl tracking-widest uppercase text-brand-secondary">Nuestra Filosofía</h1>
        <p className="mt-4 text-gray-600 font-light text-lg">Más que un estilo, una forma de entender la ropa.</p>
      </div>

      {/* Reuse the previously created component */}
      <AboutUsSection />
    </div>
  );
}
