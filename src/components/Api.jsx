import { Fragment, useEffect, useState } from "react";
import "../styles/Api.css"
import ItemApi from "./ItemApi";

export default function Api() {
    const [data, setData] = useState({});
    const [repeatTime, setRepeatTime] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);

        try {
          const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
          const result = await response.json();
          setData(result);
        } catch (error) {
          alert("Error" + error)
        }
        
        setIsLoading(false);
      };


      fetchData();

    }, []);

    const repeats = Array(repeatTime).fill(data)
    const repeats_elements = repeats.map((item , i) => {
        return (
            <ItemApi key={i} title={item.title} date={item.date} explanation={item.explanation} url={item.url}/>
        )
    })

    return (
        <Fragment>
        {isLoading ? (
            <p>Loading...</p>
            ) : (
            <div className="api-list">{repeats_elements ? repeats_elements : 'No data available'}</div>
            )}
        </Fragment>
    );
  };