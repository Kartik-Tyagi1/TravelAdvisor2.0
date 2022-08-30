import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { GetPlacesData, GetWeatherData } from "./api";
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      lat?: number,
      lng?: number
    }
}

const App = (): JSX.Element => {

    const [places, setPlaces] = useState<any[]>([]);
    const [filteredPlaces, setfilteredPlaces] = useState<any[]>([]);
    const [childClicked, setChildClicked] = useState(null);  // Used across List and Map Components

    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [bounds, setBounds] = useState({sw:{lat : 0, lng: 0}, ne:{lat : 0, lng: 0}});

    const [isLoading, setIsLoading] = useState(false)

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [weatherData, setWeatherData] = useState([]);

    // Set Starting location to where the user is
    useEffect(() => {
       navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
       })
    }, []);

    // Set the filtered places when the rating value is changed
    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setfilteredPlaces(filteredPlaces);
    }, [rating])

    // Get API data based on map view and type of travel
    useEffect(() => {
        if(bounds.sw && bounds.ne)
        {
            //console.log(coordinates, bounds);
            setIsLoading(true);

            // Input data must look like this ---> '{100, 200}'
            GetWeatherData(coordinates.lat, coordinates.lng).then((data) => setWeatherData(data));

            GetPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                //console.log(data);
                setPlaces(data?.filter((place : any) => place.name && place.num_reviews > 0));
                setfilteredPlaces([]); // empty out the filter when we get new data
                setIsLoading(false);
            })
        }
    }, [type, bounds]);

    
    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width : '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
} 

export default App;