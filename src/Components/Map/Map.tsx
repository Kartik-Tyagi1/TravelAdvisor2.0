import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import GoogleMapReact from 'google-map-react';
import React from 'react';

import CoolMapStyles from './CoolMapStyles';
import useStyles from './MapStyles';

interface MapProps {
    setCoordinates : any,
    setBounds: any,
    coordinates: any,
    places : any,
    setChildClicked: any,
    weatherData: any
}

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData} : MapProps) : JSX.Element => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)'); // Anything greater than 600 will not be mobile

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key : `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: CoolMapStyles}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng:e.center.lng });
                    setBounds({ne: e.marginBounds.ne,
                                sw: e.marginBounds.sw,
                                nw: e.marginBounds.nw,
                                se: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place : any, i : number) => (
                    <div 
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large'/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer} 
                                        src={place.photo ? place.photo.images.large.url : "https://blog.indiagatebkk.com/wp-content/uploads/2020/06/File981-scaled.jpg"}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data : any, i : number) => (
                    <div key={i} lat={data.location.lat} lng={data.location.lon}>
                        <img height={100} src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
    
}




export default Map;