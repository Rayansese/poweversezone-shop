export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-neutral-950 font-sans text-neutral-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-10 tracking-wide">Returns & Exchanges</h1>
        
        <div className="space-y-8 font-light text-sm leading-relaxed tracking-wide">
          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Our Philosophy on Returns</h2>
            <p>We craft our garments with the highest attention to detail. If a piece does not meet your expectations or the fit is incorrect, we accept returns within 14 days of delivery.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Conditions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unworn, unwashed, and in their original condition.</li>
              <li>All original tags must still be attached.</li>
              <li>The original packaging must be included and undamaged.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Process</h2>
            <p>To initiate a return, please contact our syndicate support team with your order number. We will provide you with a return authorization and shipping instructions. Please note that return shipping costs are the responsibility of the customer unless the item is defective.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Refunds</h2>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
