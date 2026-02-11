import * as XLSX from "xlsx";

const downloadHistogramExcel = (
  data,
  indicator,
  indicatorYear,
  selectedRegion,
  selecetedMonth,
  language,
) => {
  // Headers based on language
  const nameHeader = language === "en" ? "Name" : "დასახელება";
  const percentHeader = language === "en" ? "Percent" : "პროცენტი";

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatValue = (value) => {
    return formatter.format(value);
  };

  // Create sheet data with category names and values
  const sheetData = [
    [nameHeader, percentHeader],
    ...data.map((item) => [
      item[`name_${language}`], // Use localized name
      formatValue(item.value),
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Auto-size columns
  const maxNameLength = Math.max(
    ...data.map((item) => item[`name_${language}`]?.length || 0),
    nameHeader.length,
  );

  worksheet["!cols"] = [
    { wch: Math.min(maxNameLength + 2, 50) }, // Name column with max width of 50
    { wch: 12 }, // Percent column
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Histogram");

  // Get month name for filename

  const regionName =
    selectedRegion || (language === "en" ? "Region" : "რეგიონი");

  const fileName =
    language === "en"
      ? `${indicator} (${regionName}) (${indicatorYear} წლის ${selecetedMonth}).xlsx`
      : `${indicator} (${regionName}) (${selecetedMonth} ${indicatorYear} Year).xlsx`;

  XLSX.writeFile(workbook, fileName);
};

export default downloadHistogramExcel;
