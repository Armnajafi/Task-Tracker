import { Fragment, useEffect, useState } from "react";
import "../styles/Api.css"
import ItemApi from "./ItemApi";

export default function Api() {
    const [data, setData] = useState({});
    const [repeatTime, setRepeatTime] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      // Fetch data from NASA Api
      const fetchData = async () => {
        setIsLoading(true);

        try {
          const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
          const result = await response.json();
          setData(result); // Set the fetched data to the state variable
          setIsLoading(false);  // Set isLoading back to false after data fetching is complete
        } catch (error) {
          alert("Error" + error) // Display an error message if an error occurs during fetching
        }
        
      };


      fetchData(); // use fetchData function when the component load

    }, []);


    // Repeat Data for {repeatTime} times
    const repeats = Array(repeatTime).fill(data)
    const repeats_elements = repeats.map((item , i) => {
        // return this data with a ItemApi Component for show better 
        return (
            <ItemApi key={i} title={item.title} date={item.date} explanation={item.explanation} url={item.url}/>
        )
    })

    return (
        <Fragment>
          {/* check loading */}
        {isLoading ? (
            <p>Loading...</p>
            ) : (
            <div className="api-list">{repeats_elements ? repeats_elements : 'No data available'}</div>
            )}
        </Fragment>
    );
  };