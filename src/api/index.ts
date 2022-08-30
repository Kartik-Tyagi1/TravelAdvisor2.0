import axios from "axios";

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';



export const GetPlacesData = async ( type : string, sw : {lat : number, lng: number}, ne: {lat : number, lng: number}) => {
    try {
        // Destructure the data so we can get all of it right away
        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        return data;
    } 
    catch (error) {
        console.log(error)
    }
}

export const GetWeatherData = async (lat : number, lng : number) => {
  try {
    const {data} = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/current', {
      //params: {q: '{100, 200}'}
      params: {lon: lng, lat: lat},
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
    });

    return data;
  } catch (error) {
    console.log(error)
  }
}