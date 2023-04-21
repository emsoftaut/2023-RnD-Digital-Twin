import react, {useState, useEffect } from 'react';

const FactoryIoDisplay = () => {

    const [factoryIoData, setFactoryIoData] = useState([]);

    useEffect(() => {
        const fetchFactoryIoData = async () => {
            try {
                const url = await fetch(
                    'https://australia-southeast1-middleware-9544f.cloudfunctions.net/middlewareApp/factoryIoData'
                );
                console.log('Request url:', url);
                const response = await fetch(url);
                console.log('Response:', response);
                const data = await response.json();
                setFactoryIoData(data.data);
                console.log('Data:', data);
                console.log('Data.data:',data.data);
            } catch (err) {
                console.error('Error fetching Factory I/O data', err);
            }
        };
        fetchFactoryIoData();
    }, []);

    return (
        <div>
        <h1>Factory IO Data</h1> 
        {factoryIoData ? (
            <pre>{JSON.stringify(factoryIoData, null, 2)}</pre> 
        ) : (
            <p>Fetching dummy data...</p>
        )}
    </div>
    );
};

export default FactoryIoDisplay;