import { Card, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from './ListStyles';


interface ListProps {
    places : any,
    childClicked : any,
    isLoading : boolean,
    type: string,
    setType: any,
    rating: string,
    setRating: any
}

const List = ({places, childClicked, isLoading, type, setType, rating, setRating} : ListProps) : JSX.Element => {

    // Element references
    const [elRefs, setElRefs] = useState([]);
    const classes = useStyles(); // This is a hook


    //console.log({childClicked})

    useEffect(() => {
        const refs = Array(places?.length).fill(places).map((_, i) => elRefs[i] || createRef());
        //console.log(refs);
        setElRefs(refs);
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotels, & Attractions</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value as string)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value as string)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3</MenuItem>
                            <MenuItem value={4}>Above 4</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place : any, i : number) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails  
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default List;