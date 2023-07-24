import {useState, useEffect} from "react";
import {appDb} from "../firebaseConfig";
import {ref, onValue} from "firebase/database";

const FireBaseData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const databaseRef = ref(appDb, "");
    
    const dataListener = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        const dataArray = Object.keys(data).map((key) => ({
          title: key,
          path: `/${key}`,
          info: data[key],
        }));
        setData(dataArray);
      }
    });

      //Remove listener if component unmounts
      return () => {
        databaseRef.off("value", dataListener);
      };

  }, []);

  return JSON.stringify(data, null, 2);
};

export default FireBaseData;
