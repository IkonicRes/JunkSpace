
const apiKey = 'EM9JB4-VFQV6Y-62PKQS-54VO';

const satelliteId = 25000;

// Function to fetch ISS position
async function fetchISSPosition() {
  try {
    const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/positions/${satelliteId}/41.702/-76.014/0/1/&apiKey=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch ISS position.');
    }

    const data = await response.json();
    
    if (data.positions.length > 0) {
      const issPosition = data.positions[0];
      const { satlatitude, satlongitude } = issPosition;
      console.log(data)
      console.log(`ISS Latitude: ${satlatitude}`);
      console.log(`ISS Longitude: ${satlongitude}`);
    } else {
      console.log('No position data available for the ISS.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to fetch ISS position
fetchISSPosition();