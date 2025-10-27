import {  Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import type { EarthquakeData } from "../store/datastore";
import {  useEffect } from "react";
import useDataStore from "../store/datastore";

interface ChartPanelProps {
    chartData: EarthquakeData[];
    setSelectedData: (itemId: string | null) => void;
    selectedData: string | null;
    xAxis: keyof EarthquakeData;
    yAxis: keyof EarthquakeData;
}

function ChartPanel({chartData,  setSelectedData,xAxis, yAxis}: ChartPanelProps) {

    const selectedData = useDataStore((state) => state.selectedItem);
    
    const handleDataPointClick = (data: any, _:any) => {
        if (!data) return;
        setSelectedData(data.id);
    }

    useEffect(() => {
        console.log("Selected data point ID changed to:", selectedData);
    }, [selectedData]);

    return (
        <div className="shadow p-2 h-96 w-full">
            <ScatterChart
                style={{ width: '100%', height: '100%'}}
                responsive
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10
                }}
                >
                <XAxis dataKey={xAxis} type="number" name={xAxis} />
                <YAxis dataKey={yAxis} type="number" name={yAxis} />
                <Scatter name="Earthquake" data={chartData} fill="red" onClick={handleDataPointClick} onMouseEnter={handleDataPointClick} onMouseLeave={ () => setSelectedData(null) }
                    shape={ (props:any) => {
                        const { cx, cy, payload } = props;
                        const isSelected = payload.id === selectedData;
                        return (
                            <circle
                                cx={cx}
                                cy={cy}
                                r={isSelected ? 8 : 4}
                                fill={isSelected ? 'blue' : 'red'}
                                stroke={isSelected ? 'black' : 'none'}
                                strokeWidth={isSelected ? 4 : 0}
                                z={isSelected ? 100 : 0}
                                
                            />
                        );
                    }
                }
                />
            </ScatterChart>
        </div>
    );
    }

export default ChartPanel;