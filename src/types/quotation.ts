export interface LineItem {
  id: string;
  description: string;
  ratePerUnit: number;
  qty: number;
  amount: number;
}

export interface QuotationData {
  refNo: string;
  date: string;
  customerName: string;
  customerState: string;
  productTitle: string;
  specifications: string[];
  lineItems: LineItem[];
  gstPercentage: number;
  specialNotes: string[];
  customerScope: string;
  // Company info
  companyName: string;
  companyAddress: string;
  companyPhone1: string;
  companyPhone2: string;
  companyEmail: string;
  companyWeb: string;
  // Banking
  bankName: string;
  payTo: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  gstNumber: string;
  panNumber: string;
  // Images
  productImage: string | null;
  galleryImages: string[];
  galleryTitle: string;
}
