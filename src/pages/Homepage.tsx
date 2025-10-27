import ChartPanel from "../components/ChartPanel";
import DataPanel from "../components/DataPanel";
import { LoadingScreen } from "../components/LoadingScreen";
import { useCsvData } from "../hooks/useFetchData";
import useDataStore from "../store/datastore";

function Homepage() {

    const { data, isLoading, error } = useCsvData('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'); 

    const selectedItem = useDataStore((state) => state.selectedItem);
    const setSelectedItem = useDataStore((state) => state.setSelectedItem);

    if (isLoading) return <LoadingScreen />;
    if (error) return <div>Error loading data</div>;
    return (
        <>
        <div className="container max-h-screen">
            <div className="flex flex-col">
                <ChartPanel chartData={data} setSelectedData={setSelectedItem} selectedData={selectedItem}/>
                <DataPanel tableData={data} setSelectedData={setSelectedItem} selectedData={selectedItem}/>
            </div>
        </div>
        </>
    );
    }
    
export default Homepage;