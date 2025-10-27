import {create} from 'zustand';

export interface EarthquakeData {
    id: string;
    mag: number;
    place: string;
    time: string;
    latitude: number;
    longitude: number;
    depth: number;

    gap:number;
    horizontalError:string;
    depthError:string;
    magError:string;
    magNst:number;
    status:string;
}

interface DataStore {
    data: EarthquakeData[];
    selectedItem: string | null;
    setData: (newData: EarthquakeData[]) => void;
    setSelectedItem: (itemId: string) => void;
}

const useDataStore = create<DataStore>((set) => ({
    data: [],
    selectedItem: null,
    setData: (newData:EarthquakeData[]) => set({data: newData}),
    setSelectedItem: (itemId: string| null) => set({selectedItem: itemId}),
}));

export default useDataStore;