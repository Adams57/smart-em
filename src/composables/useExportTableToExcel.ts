import * as XLSX from "xlsx";
import { useToast } from "primevue/usetoast";

export default function useExportTableToExcel() {
  const toast = useToast();

  const exportToExcel = <T extends Record<string, unknown>>(
    data: T[],
    fileName: string,
    sheetName = "Sheet1"
  ) => {
    try {
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data);

      // Calculate column widths
      const objectKeys = data.length ? Object.keys(data[0]) : [];
      const colWidths = objectKeys.map((key) => {
        const maxLength = Math.max(
          key.length,
          ...data.map((row) => {
            const value = row[key];
            return value ? value.toString().length : 0;
          })
        );
        return { wch: maxLength + 2 }; // add padding
      });

      // Apply column widths
      ws["!cols"] = colWidths;

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      // Generate file and download
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      return true;
    } catch (error) {
      console.error("Export error:", error);
      return false;
    }
  };

  const exportWithToast = <
    T extends Record<string, unknown> = Record<string, unknown>
  >(
    data: T[],
    fileName: string,
    successMessage = "Data exported successfully",
    errorMessage = "Failed to export data"
  ) => {
    const success = exportToExcel<T>(data, fileName);

    toast.add({
      severity: success ? "success" : "error",
      summary: success ? "Success" : "Error",
      detail: success ? successMessage : errorMessage,
      life: 3000
    });

    return success;
  };

  return {
    exportToExcel,
    exportWithToast
  };
}
