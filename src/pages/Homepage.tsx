import ChartPanel from "../components/ChartPanel";
import DataPanel from "../components/DataPanel";
import { LoadingScreen } from "../components/LoadingScreen";
import { useCsvData } from "../hooks/useFetchData";
import useDataStore from "../store/datastore";
import Dropdown from "../components/DropDown";
import { useState, useCallback } from "react";
import debounce from 'lodash-es/debounce';
import type { EarthquakeData } from "../store/datastore";

const NUMERIC_COLUMNS = [
  { label: "Magnitude", value: "mag" },
  { label: "Latitude", value: "latitude" },
  { label: "Longitude", value: "longitude" },
  { label: "Depth", value: "depth" },
  { label: "Gap", value: "gap" },
  { label: "MagNst", value: "magNst" },
];

function Homepage() {

    const { data, isLoading, error } = useCsvData('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'); 

    const selectedItem = useDataStore((state) => state.selectedItem);
    const setSelectedItem = useDataStore((state) => state.setSelectedItem);

    const [xAxis, setXAxis] = useState<keyof EarthquakeData>("longitude");
    const [yAxis, setYAxis] = useState<keyof EarthquakeData>("latitude");

    const debouncedSetXAxis = useCallback(
        debounce((value: keyof EarthquakeData) => setXAxis(value), 300),
        []
    );

    const debouncedSetYAxis = useCallback(
        debounce((value: keyof EarthquakeData) => setYAxis(value), 300),
        []
    );

    if (isLoading) return <LoadingScreen />;
    if (error) return <div>Error loading data</div>;
    return (
        <>
        <div className="container max-h-screen">
            <div className="flex flex-col">
                <div className="flex space-x-4 mb-2">
        <Dropdown
          label="X Axis"
          options={NUMERIC_COLUMNS.map(col => col.value)}
          value={xAxis as string}
          onChange={(value) => debouncedSetXAxis(value as keyof EarthquakeData)}
        />
        <Dropdown
          label="Y Axis"
          options={NUMERIC_COLUMNS.map(col => col.value)}
          value={yAxis as string}
          onChange={(value) => debouncedSetYAxis(value as keyof EarthquakeData)}
        />
      </div>
                <ChartPanel chartData={data} setSelectedData={setSelectedItem} selectedData={selectedItem} xAxis={xAxis} yAxis={yAxis}/>
                <DataPanel tableData={data} setSelectedData={setSelectedItem} selectedData={selectedItem}/>
            </div>
        </div>
        </>
    );
    }
    
export default Homepage;