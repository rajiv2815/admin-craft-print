import { QuotationData } from "@/types/quotation";
import productMain from "@/assets/product-main.png";
import stairlift1 from "@/assets/stairlift-1.jpg";
import stairlift2 from "@/assets/stairlift-2.jpg";
import stairlift3 from "@/assets/stairlift-3.jpg";
import stairlift4 from "@/assets/stairlift-4.jpg";

export const defaultQuotation: QuotationData = {
  refNo: "MHS5472",
  date: "2026-03-06",
  customerName: "",
  customerState: "New Delhi",
  productTitle: "Acorn Superglide 130 Straight Stairlift - Indoor",
  specifications: [
    "Speed 4.8 Inches Per Second - No Greater than 0.15/m",
    "127 kg load capacity.",
    "Rack and Pinion Drive Method",
    "24V DC (12V 7Ah x 2 Battery)",
    "Joystick Control & 2 Infrared Remote Control",
    "Manual Folding Footrest",
    "Extruded 5 Meters Aluminum Track",
    "Main Supply 100-240V AC",
  ],
  lineItems: [
    { id: "1", description: "Acorn Superglide 130 Stairlift", ratePerUnit: 130000, qty: 1, amount: 130000 },
    { id: "2", description: "Extra Rail Length Charge (Per Meter)", ratePerUnit: 0, qty: 0, amount: 0 },
    { id: "3", description: "Installation Charge (Included in Price)", ratePerUnit: 0, qty: 0, amount: 0 },
    { id: "4", description: "Freight Charge (As per actual)", ratePerUnit: 0, qty: 0, amount: 0 },
  ],
  gstPercentage: 5,
  specialNotes: [
    "The stair lift carries a Warranty of 12 Months from the Invoice date.",
    "The above rates are valid for a period of 15 days only and are subject to change without prior notice.",
    "The payment of Rs 50% advance and balance payment on installation.",
    "Freight Charges As Actual - As per actual",
  ],
  customerScope: "5Amp Charging Point",
  companyName: "Gajanana Lift",
  companyAddress: "322/A, South Extension, Part-2, New Delhi-110049",
  companyPhone1: "+91-9911747789",
  companyPhone2: "+91-9555264649",
  companyEmail: "info@gajananalift.com",
  companyWeb: "www.gajananalift.com",
  bankName: "State Bank Of India",
  payTo: "State Bank Of India",
  accountHolder: "M/s - Santosh Kumar Dubey",
  accountNumber: "32329267818",
  ifsc: "SBIN0003219",
  gstNumber: "07BK0PD6215P1ZQ",
  panNumber: "BKOPD6215P",
  productImage: productMain,
  galleryImages: [stairlift1, stairlift2, stairlift3, stairlift4],
  galleryTitle: "Acorn Stairlift Photos",
  bankLogo: null,
  addOnItems: [
    { id: "1", name: "Constant Voltage Transformer (CVT)", price: 6500 },
    { id: "2", name: "Rust-Proof Racking (4.5 Meters)", price: 10000 },
    { id: "3", name: "Hinge Rail - Powered", price: 75000 },
    { id: "4", name: "Lithium Battery", price: 30000 },
  ],
};
