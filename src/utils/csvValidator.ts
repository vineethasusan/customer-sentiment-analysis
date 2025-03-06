
/**
 * Utility to validate and process CSV files for time series analysis
 */

export interface CSVValidationResult {
  isValid: boolean;
  errors: string[];
  data?: {
    headers: string[];
    rows: any[][];
    timeColumn?: string;
    valueColumns: string[];
  };
}

/**
 * Validates a CSV string for time series analysis
 * @param csvContent The CSV content as a string
 * @returns Validation result with errors or processed data
 */
export const validateCSV = (csvContent: string): CSVValidationResult => {
  const errors: string[] = [];
  
  // Basic content check
  if (!csvContent || csvContent.trim() === "") {
    return {
      isValid: false,
      errors: ["The CSV file is empty."],
    };
  }
  
  // Parse CSV
  const lines = csvContent.trim().split("\n");
  if (lines.length < 2) {
    return {
      isValid: false,
      errors: ["The CSV file must contain at least a header row and one data row."],
    };
  }
  
  // Extract headers and validate
  const headers = lines[0].split(",").map(h => h.trim());
  if (headers.length < 2) {
    return {
      isValid: false,
      errors: ["The CSV file must contain at least two columns: a date/time column and a value column."],
    };
  }
  
  // Identify potential time columns based on common names
  const potentialTimeColumns = headers.filter(h => 
    /date|time|period|month|year|day|week|quarter/i.test(h)
  );
  
  // Parse data rows
  const rows: any[][] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map(cell => cell.trim());
    
    // Check if row has the correct number of columns
    if (row.length !== headers.length) {
      errors.push(`Row ${i} has ${row.length} columns, but the header has ${headers.length} columns.`);
      continue;
    }
    
    rows.push(row);
  }
  
  // If we couldn't parse any rows
  if (rows.length === 0) {
    return {
      isValid: false,
      errors: ["Could not parse any data rows from the CSV file."],
    };
  }
  
  // Identify value columns (assume all non-time columns with numeric values are value columns)
  let timeColumn: string | undefined;
  
  // If we have potential time columns, use the first one
  if (potentialTimeColumns.length > 0) {
    timeColumn = potentialTimeColumns[0];
  } else {
    // If no obvious time column, check which column could be a date/time
    const firstRowIndices = headers.map((_, index) => {
      const value = rows[0][index];
      // Check if the value could be a date
      return !isNaN(Date.parse(value)) ? index : -1;
    }).filter(index => index !== -1);
    
    if (firstRowIndices.length > 0) {
      timeColumn = headers[firstRowIndices[0]];
    } else {
      // Default to first column if we can't identify a time column
      timeColumn = headers[0];
      errors.push("Could not identify a clear date/time column. Using the first column by default.");
    }
  }
  
  // Identify numeric columns
  const valueColumns = headers.filter(header => {
    if (header === timeColumn) return false;
    
    // Check if at least one row has a numeric value for this column
    return rows.some(row => {
      const index = headers.indexOf(header);
      const value = row[index];
      return !isNaN(parseFloat(value));
    });
  });
  
  if (valueColumns.length === 0) {
    errors.push("Could not identify any numeric value columns in the CSV file.");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: {
      headers,
      rows,
      timeColumn,
      valueColumns
    }
  };
};

/**
 * Extracts time series data from validated CSV data
 * @param validationResult The validated CSV data
 * @returns Formatted time series data for visualization and analysis
 */
export const extractTimeSeriesData = (validationResult: CSVValidationResult): { 
  labels: string[];
  values: number[];
} | null => {
  if (!validationResult.isValid || !validationResult.data) {
    return null;
  }
  
  const { headers, rows, timeColumn, valueColumns } = validationResult.data;
  
  if (!timeColumn || valueColumns.length === 0) {
    return null;
  }
  
  const timeIndex = headers.indexOf(timeColumn);
  const valueIndex = headers.indexOf(valueColumns[0]); // Use the first value column
  
  const labels: string[] = [];
  const values: number[] = [];
  
  rows.forEach(row => {
    labels.push(row[timeIndex]);
    values.push(parseFloat(row[valueIndex]));
  });
  
  return {
    labels,
    values
  };
};
