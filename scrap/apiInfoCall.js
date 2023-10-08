import fetch from 'node-fetch'; // If you're using Node.js

// Replace 'NORAD_ID' with the NORAD Catalog ID of the satellite you want to get information about
const noradId = '25544'; // Example: International Space Station (ISS)

async function fetchSatelliteInfo() {
  try {
    const response = await fetch(`https://www.celestrak.com/NORAD/elements/stations.txt`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch TLE data.');
    }

    const tleData = await response.text();
    const tleLines = tleData.split('\n');

    // Find the TLE set for the specified satellite (based on NORAD Catalog ID)
    const satelliteTLE = tleLines.find((line, index) => {
      if (index % 3 === 0 && line.includes(` ${noradId} `)) {
        return true;
      }
      return false;
    });

    if (satelliteTLE) {
      // Parse the TLE set to extract information
      const lines = satelliteTLE.trim().split('\n');
      const satelliteName = lines[0].trim();
      const internationalDesignator = lines[1].trim();
      // Extract more information from the TLE as needed

      console.log('Satellite Information:');
      console.log(`Satellite Name: ${satelliteName}`);
      console.log(`International Designator: ${internationalDesignator}`);
      // Print additional information as needed
    } else {
      console.log('Satellite not found in TLE data.');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to fetch satellite information
fetchSatelliteInfo();
