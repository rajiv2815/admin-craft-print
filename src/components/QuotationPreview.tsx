import { QuotationData } from "@/types/quotation";
import logo from "@/assets/logo.jpg";
import sbiLogo from "@/assets/sbi-logo.png";

function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  if (num === 0) return 'Zero';
  function convert(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convert(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '');
  }
  return convert(Math.round(num)) + ' Only';
}

interface Props {
  data: QuotationData;
}

const QuotationPreview = ({ data }: Props) => {
  const subTotal = data.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const gstAmount = (subTotal * data.gstPercentage) / 100;
  const total = subTotal + gstAmount;

  return (
    <div id="quotation-pdf" className="pdf-content bg-white max-w-[210mm] mx-auto shadow-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page 1 */}
      <div className="p-8" style={{ minHeight: '297mm' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6 border-b-2 border-blue-600 pb-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Company Logo" className="h-20 w-auto object-contain" />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'hsl(220, 70%, 45%)' }}>{data.companyName}</h1>
              <p className="text-sm text-gray-600">{data.companyAddress}</p>
              <p className="text-sm text-gray-600">Call: {data.companyPhone1}, {data.companyPhone2}</p>
              <p className="text-sm text-gray-600">Email: {data.companyEmail} | Web: {data.companyWeb}</p>
            </div>
          </div>
        </div>

        {/* Ref & Date */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <span className="font-semibold">Ref No:</span>
            <span>{data.refNo}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Date:</span>
            <span>{new Date(data.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Customer */}
        <div className="flex gap-8 mb-6 p-3 rounded" style={{ background: 'hsl(210, 20%, 96%)' }}>
          <div><span className="font-semibold">Name: </span>{data.customerName || '_______________'}</div>
          <div><span className="font-semibold">State: </span>{data.customerState}</div>
        </div>

        {/* Product Title + Image */}
        <div className="flex items-start gap-6 mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'hsl(220, 70%, 45%)' }}>{data.productTitle}</h2>
            <h3 className="font-semibold mb-2">Acorn Superglide 130 Specification:</h3>
            <ul className="space-y-1">
              {data.specifications.map((spec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✔</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.productImage && (
            <img src={data.productImage} alt="Product" className="w-40 h-auto object-contain rounded" />
          )}
        </div>

        {/* Pricing Table */}
        <table className="w-full mb-4 text-sm">
          <thead>
            <tr style={{ background: 'hsl(220, 70%, 45%)', color: 'white' }}>
              <th className="border p-2 text-left w-12">Sr No</th>
              <th className="border p-2 text-left">Product Description</th>
              <th className="border p-2 text-right">Rate Per Unit</th>
              <th className="border p-2 text-center">Qty</th>
              <th className="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, idx) => (
              <tr key={item.id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-right">{item.ratePerUnit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="border p-2 text-center">{item.qty}</td>
                <td className="border p-2 text-right">{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
            <tr className="font-semibold" style={{ background: 'hsl(210, 20%, 96%)' }}>
              <td className="border p-2" colSpan={4}>Sub Total</td>
              <td className="border p-2 text-right">{subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr style={{ background: 'hsl(210, 20%, 96%)' }}>
              <td className="border p-2" colSpan={4}>GST {data.gstPercentage}%</td>
              <td className="border p-2 text-right">{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr className="font-bold text-base" style={{ background: 'hsl(220, 70%, 45%)', color: 'white' }}>
              <td className="border p-2" colSpan={4}>Total</td>
              <td className="border p-2 text-right">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm mb-4"><strong>Amount in Words:</strong> {numberToWords(total)}</p>

        {/* Special Notes */}
        <div className="mb-4">
          <h3 className="font-bold mb-2" style={{ color: 'hsl(220, 70%, 45%)' }}>Special Notes</h3>
          <ul className="space-y-1">
            {data.specialNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-600 mt-0.5">✔</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm"><strong>Customer Scope:</strong> {data.customerScope}</p>
      </div>

      {/* Page 2 */}
      <div className="p-8 border-t-2 border-blue-600" style={{ minHeight: '297mm' }}>
        {/* Header repeated */}
        <div className="flex items-center gap-4 mb-6 border-b-2 border-blue-600 pb-4">
          <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'hsl(220, 70%, 45%)' }}>{data.companyName}</h1>
            <p className="text-xs text-gray-600">{data.companyAddress}</p>
            <p className="text-xs text-gray-600">Call: {data.companyPhone1}, {data.companyPhone2}</p>
          </div>
        </div>

        {/* Gallery */}
        <h2 className="text-lg font-bold mb-4" style={{ color: 'hsl(220, 70%, 45%)' }}>Acorn Stairlift Photos</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {data.galleryImages.map((img, i) => (
            <img key={i} src={img} alt={`Stairlift ${i + 1}`} className="w-full h-48 object-cover rounded-lg border" />
          ))}
        </div>

        {/* Banking Details */}
        <h2 className="text-lg font-bold mb-4" style={{ color: 'hsl(220, 70%, 45%)' }}>Banking Details</h2>
        <div className="flex items-start gap-4 mb-4">
          <img src={sbiLogo} alt="Bank Logo" className="h-12 w-auto object-contain" />
          <table className="text-sm">
            <tbody>
              <tr><td className="pr-4 font-semibold py-1">Pay to</td><td>{data.payTo}</td></tr>
              <tr><td className="pr-4 font-semibold py-1">Account Holder</td><td>{data.accountHolder}</td></tr>
              <tr><td className="pr-4 font-semibold py-1">A/c</td><td>{data.accountNumber}</td></tr>
              <tr><td className="pr-4 font-semibold py-1">IFSC</td><td>{data.ifsc}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm space-y-1 mb-6">
          <p><strong>GST:</strong> {data.gstNumber}</p>
          <p><strong>PAN:</strong> {data.panNumber}</p>
        </div>

        <p className="text-sm text-gray-600 italic">For any further details please feel free to ask.</p>
      </div>
    </div>
  );
};

export default QuotationPreview;
