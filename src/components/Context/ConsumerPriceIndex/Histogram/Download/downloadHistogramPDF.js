import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import georgianFont from "../../../../../assets/fonts/NotoSansGeorgian_ExtraCondensed-Bold.ttf";

const downloadHistogramPDF = (
  data,
  indicator,
  indicatorYear,
  selectedRegion,
  selectedMonth,
  language,
) => {
  const doc = new jsPDF();

  const isGeorgian = language === "ge";

  if (isGeorgian) {
    doc.addFont(georgianFont, "NotoSansGeorgian", "normal");
    doc.addFont(georgianFont, "NotoSansGeorgian", "bold");
    doc.setFont("NotoSansGeorgian");
  }

  const nameHeader = language === "en" ? "Name" : "დასახელება";
  const percentHeader = language === "en" ? "Percent" : "პროცენტი";

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatValue = (value) => formatter.format(value);

  // Table head and body
  const head = [[nameHeader, percentHeader]];
  const body = data.map((item) => [
    item[`name_${language}`],
    formatValue(item.value),
  ]);

  const regionName =
    selectedRegion || (language === "en" ? "Region" : "რეგიონი");

  const fileName =
    language === "en"
      ? `${indicator} (${regionName}) (${indicatorYear} ${selectedMonth}).pdf`
      : `${indicator} (${regionName}) (${selectedMonth} ${indicatorYear} წელი).pdf`;

  // Title
  doc.setFontSize(14);
  doc.text(
    `${indicator} - ${regionName} (${indicatorYear} ${selectedMonth})`,
    105,
    20,
    { align: "center" },
  );

  // Table
  autoTable(doc, {
    startY: 30,
    head,
    body,
    theme: "grid",
    styles: {
      font: isGeorgian ? "NotoSansGeorgian" : "helvetica",
      fontSize: 10,
      valign: "middle",
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
      halign: "center", // ✅ headers centered
    },
    columnStyles: {
      0: { halign: "left" }, // ✅ first column (names) left aligned
      1: { halign: "center" }, // ✅ second column (percent) centered
    },
    margin: { top: 30 },
  });

  doc.save(fileName);
};

export default downloadHistogramPDF;
