export function Footer() {
  return (
    <footer className="bg-black pt-32 pb-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <span className="font-playfair text-3xl tracking-widest text-[#D4AF37] font-bold block mb-6">
              VENDETTA
            </span>
            <p className="text-neutral-500 text-sm max-w-sm font-light leading-relaxed">
              Premium garments for those who demand authority without raising their voice. Designed deliberately in the shadows.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">Operations</span>
            <a href="/policies/shipping" className="text-neutral-400 hover:text-white text-sm transition-colors">Shipping</a>
            <a href="/policies/returns" className="text-neutral-400 hover:text-white text-sm transition-colors">Returns</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Care Instructions</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">Syndicate</span>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Instagram</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Twitter (X)</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Journal</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-900/50 text-neutral-600 text-xs">
          <p>&copy; {new Date().getFullYear()} VENDETTA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-light tracking-wide">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
