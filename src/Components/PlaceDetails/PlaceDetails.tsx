import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import React from "react";

import useStyles from './PlaceDetailsStyles';

// Typescript requires that all binding elements have a type
// Since ours is an object we must define it
interface PlaceDetailsProps {
    place : any,
    selected: any,
    refProp : any
}

// Place is a binding element so we can pass data into this component from other components
const PlaceDetails = ({place, selected, refProp} : PlaceDetailsProps) : JSX.Element => {
    
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const classes = useStyles();


    //console.log(place);
    return (
        <Card elevation={6}>
            <CardMedia
                style={{height : 350}}
                image={place.photo ? place.photo.images.large.url : "https://blog.indiagatebkk.com/wp-content/uploads/2020/06/File981-scaled.jpg"}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant='subtitle1'>Out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {/* Map over the Awards for each restaurant  */}
                {place?.awards?.map((award : any) => (
                    <Box my={1} display='flex' justifyContent="space-between">
                        <img src={award.images.small} alt={award.display_name}></img>
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}
                {/* Map over each type of food the restaurant makes */}
                {place?.cuisine?.map(({name} : any) => (
                    <Chip key={name} size="small" label={name} className={classes.chip}></Chip>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon/> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;