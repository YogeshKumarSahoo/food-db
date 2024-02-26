const axios = require('axios')

// Replace YOUR_API_KEY with your actual API key
const apiKey = process.env.DISTANCE_API_KEY;
console.log();
// Define origin and destination coordinates
const origin = '28.6139,77.2090'; // Bhubaneswar, India
const destination = '26.2389,73.0243'; // Rajkot, India

const getDistance = async () => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&travelMode=driving&key=${apiKey}`
        );

        if (response.data.status === 'OK') {
            const distance = response.data.rows[0].elements[0].distance.text;
            const duration = response.data.rows[0].elements[0].duration.text;
            console.log(`Distance: ${distance}`);
            console.log(`Duration: ${duration}`);
        } else {
            console.error(`Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error(error);
    }
};

getDistance();
