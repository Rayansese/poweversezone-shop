export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-neutral-950 font-sans text-neutral-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-10 tracking-wide">Shipping Policy</h1>
        
        <div className="space-y-8 font-light text-sm leading-relaxed tracking-wide">
          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Order Processing</h2>
            <p>All orders are processed within 2 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">Domestic Shipping Rates</h2>
            <p>We offer flat-rate shipping for domestic orders. Orders over $500 qualify for complimentary priority shipping.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">International Shipping</h2>
            <p>We offer worldwide shipping. Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. VENDETTA is not responsible for these charges if they are applied and are your responsibility as the customer.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-widest uppercase text-xs">How do I check the status of my order?</h2>
            <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
