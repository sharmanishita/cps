// Developed by Manjistha Bidkar

import * as XLSX from 'xlsx';

// Load concepts (topics) from the Excel file
export function loadConceptsFromExcel(filePath: string): string[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['DSA_Concept_Graph'];
  const data = XLSX.utils.sheet_to_json<{ Concept: string }>(sheet);

  return data
    .map(row => row.Concept?.trim().toLowerCase())
    .filter((v): v is string => !!v);
}

// Identify which concepts are present in the extracted PDF text
export function identifyConcepts(text: string, concepts: string[]): string[] {
  const lowerText = text.toLowerCase();
  return concepts.filter(concept => lowerText.includes(concept));
}
