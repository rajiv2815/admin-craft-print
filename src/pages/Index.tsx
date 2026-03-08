import { useState } from "react";
import { QuotationData } from "@/types/quotation";
import { defaultQuotation } from "@/lib/defaultQuotation";
import QuotationPreview from "@/components/QuotationPreview";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Download, PanelLeftClose, PanelLeftOpen, Eye } from "lucide-react";
import html2pdf from "html2pdf.js";

const Index = () => {
  const [data, setData] = useState<QuotationData>(defaultQuotation);
  const [showAdmin, setShowAdmin] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const element = document.getElementById("quotation-pdf");
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `Quotation_${data.refNo}_${data.customerName || 'Draft'}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'hsl(210, 20%, 96%)' }}>
      {/* Admin Panel */}
      {showAdmin && (
        <div className="w-[420px] shrink-0 border-r bg-card flex flex-col">
          <div className="h-14 flex items-center justify-between px-4 border-b" style={{ background: 'hsl(220, 25%, 12%)', color: 'hsl(210, 20%, 90%)' }}>
            <span className="font-semibold text-sm">✏️ Quotation Editor</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-inherit hover:bg-white/10" onClick={() => setShowAdmin(false)}>
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
          <AdminPanel data={data} onChange={setData} />
        </div>
      )}

      {/* Preview */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 flex items-center justify-between px-4 border-b bg-card">
          <div className="flex items-center gap-2">
            {!showAdmin && (
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setShowAdmin(true)}>
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            )}
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
          </div>
          <Button onClick={handleDownload} disabled={downloading} size="sm" style={{ background: 'hsl(220, 70%, 45%)', color: 'white' }}>
            <Download className="h-4 w-4 mr-1" />
            {downloading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <QuotationPreview data={data} />
        </div>
      </div>
    </div>
  );
};

export default Index;
