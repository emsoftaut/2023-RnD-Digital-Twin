import react, { useState, useEffect } from 'react';

const DummyDataDisplay = () => {

    const [dummyData, setDummyData] = useState(null);

    useEffect(() => {
      const fetchDummyData = async () => {
        try {
          const response = await fetch(
            'https://australia-southeast1-middleware-9544f.cloudfunctions.net/middlewareApp/dummyData'
          );
          const data = await response.json();
          setDummyData(data);
        } catch (err) {
          console.error('Error fetching dummy data:', err);
        }
      };
  
      fetchDummyData();
    }, []);

    return (
        <div>
            <h1>Dummy Data</h1> 
            {dummyData ? (
                <pre>{JSON.stringify(dummyData, null, 2)}</pre> 
            ) : (
                <p>Fetching dummy data...</p>
            )}
        </div>
    );
};

export default DummyDataDisplay;