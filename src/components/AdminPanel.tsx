import { QuotationData, LineItem } from "@/types/quotation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

interface Props {
  data: QuotationData;
  onChange: (data: QuotationData) => void;
}

const AdminPanel = ({ data, onChange }: Props) => {
  const productImgRef = useRef<HTMLInputElement>(null);
  const galleryImgRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof QuotationData>(key: K, value: QuotationData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const items = data.lineItems.map((item) => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'ratePerUnit' || field === 'qty') {
        updated.amount = Number(updated.ratePerUnit) * Number(updated.qty);
      }
      return updated;
    });
    update('lineItems', items);
  };

  const addLineItem = () => {
    update('lineItems', [...data.lineItems, {
      id: Date.now().toString(),
      description: '',
      ratePerUnit: 0,
      qty: 0,
      amount: 0,
    }]);
  };

  const removeLineItem = (id: string) => {
    update('lineItems', data.lineItems.filter((item) => item.id !== id));
  };

  const handleImageUpload = (key: 'productImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => update(key, reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => update('galleryImages', [...data.galleryImages, reader.result as string]);
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (idx: number) => {
    update('galleryImages', data.galleryImages.filter((_, i) => i !== idx));
  };

  const updateSpec = (idx: number, value: string) => {
    const specs = [...data.specifications];
    specs[idx] = value;
    update('specifications', specs);
  };

  const addSpec = () => update('specifications', [...data.specifications, '']);
  const removeSpec = (idx: number) => update('specifications', data.specifications.filter((_, i) => i !== idx));

  const updateNote = (idx: number, value: string) => {
    const notes = [...data.specialNotes];
    notes[idx] = value;
    update('specialNotes', notes);
  };

  const addNote = () => update('specialNotes', [...data.specialNotes, '']);
  const removeNote = (idx: number) => update('specialNotes', data.specialNotes.filter((_, i) => i !== idx));

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <Tabs defaultValue="quotation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quotation">Quotation</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>

        <TabsContent value="quotation" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Ref No</Label>
                  <Input value={data.refNo} onChange={(e) => update('refNo', e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">Date</Label>
                  <Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className="h-9" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Customer Name</Label>
                <Input value={data.customerName} onChange={(e) => update('customerName', e.target.value)} placeholder="Enter customer name" className="h-9" />
              </div>
              <div>
                <Label className="text-xs">State</Label>
                <Input value={data.customerState} onChange={(e) => update('customerState', e.target.value)} className="h-9" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.lineItems.map((item) => (
                <div key={item.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <Input value={item.description} onChange={(e) => updateLineItem(item.id, 'description', e.target.value)} placeholder="Description" className="h-8 text-sm flex-1 mr-2" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeLineItem(item.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">Rate</Label>
                      <Input type="number" value={item.ratePerUnit} onChange={(e) => updateLineItem(item.id, 'ratePerUnit', Number(e.target.value))} className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">Qty</Label>
                      <Input type="number" value={item.qty} onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))} className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">Amount</Label>
                      <Input value={item.amount.toLocaleString('en-IN')} disabled className="h-8 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addLineItem} className="w-full">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">GST & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">GST Percentage</Label>
                <Input type="number" value={data.gstPercentage} onChange={(e) => update('gstPercentage', Number(e.target.value))} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Customer Scope</Label>
                <Input value={data.customerScope} onChange={(e) => update('customerScope', e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs mb-2 block">Special Notes</Label>
                {data.specialNotes.map((note, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Textarea value={note} onChange={(e) => updateNote(i, e.target.value)} className="text-sm min-h-[60px]" />
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeNote(i)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addNote}><Plus className="h-3.5 w-3.5 mr-1" /> Add Note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Product Title</Label>
                <Input value={data.productTitle} onChange={(e) => update('productTitle', e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs mb-2 block">Specifications</Label>
                {data.specifications.map((spec, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={spec} onChange={(e) => updateSpec(i, e.target.value)} className="h-8 text-sm" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeSpec(i)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSpec}><Plus className="h-3.5 w-3.5 mr-1" /> Add Spec</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              {data.productImage && <img src={data.productImage} alt="Product" className="w-32 h-32 object-contain rounded mb-3 border" />}
              <input ref={productImgRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('productImage', e)} />
              <Button variant="outline" size="sm" onClick={() => productImgRef.current?.click()}>
                <Upload className="h-3.5 w-3.5 mr-1" /> Change Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Gallery Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {data.galleryImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-24 object-cover rounded border" />
                    <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeGalleryImage(i)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <input ref={galleryImgRef} type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} />
              <Button variant="outline" size="sm" onClick={() => galleryImgRef.current?.click()}>
                <Upload className="h-3.5 w-3.5 mr-1" /> Add Image
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Company Name</Label>
                <Input value={data.companyName} onChange={(e) => update('companyName', e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Address</Label>
                <Input value={data.companyAddress} onChange={(e) => update('companyAddress', e.target.value)} className="h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Phone 1</Label>
                  <Input value={data.companyPhone1} onChange={(e) => update('companyPhone1', e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">Phone 2</Label>
                  <Input value={data.companyPhone2} onChange={(e) => update('companyPhone2', e.target.value)} className="h-9" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input value={data.companyEmail} onChange={(e) => update('companyEmail', e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Website</Label>
                <Input value={data.companyWeb} onChange={(e) => update('companyWeb', e.target.value)} className="h-9" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Banking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Bank Name</Label>
                <Input value={data.bankName} onChange={(e) => update('bankName', e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Account Holder</Label>
                <Input value={data.accountHolder} onChange={(e) => update('accountHolder', e.target.value)} className="h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Account No</Label>
                  <Input value={data.accountNumber} onChange={(e) => update('accountNumber', e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">IFSC</Label>
                  <Input value={data.ifsc} onChange={(e) => update('ifsc', e.target.value)} className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">GST No</Label>
                  <Input value={data.gstNumber} onChange={(e) => update('gstNumber', e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">PAN No</Label>
                  <Input value={data.panNumber} onChange={(e) => update('panNumber', e.target.value)} className="h-9" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
