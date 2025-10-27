// useCsvData.ts
import { useQuery } from '@tanstack/react-query';
import Papa from 'papaparse';

async function fetchCsvData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const csvText = await response.text();

  // Parse CSV to JSON
  const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const filteredData = data.filter((row: any) => {
    const rowDate = new Date(row.time); // replace "date" with your column name
    return rowDate >= thirtyDaysAgo && rowDate <= today;
  });

  filteredData.sort((rowa:any,rowb:any)=>rowa.time - rowb.time);
  return filteredData;
};

export function useCsvData(url: string) {
  return useQuery({
    queryKey: ['earthquack-csv-data', url],
    queryFn: () => fetchCsvData(url),
  });
};
