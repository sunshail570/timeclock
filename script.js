function initializeMaps() {
    const cities = {
        'nyc': {
            coords: '40.7128,-74.0060',
            bounds: '-74.2590,40.4774,-73.7004,40.9176'  // Fixed NYC bounds
        },
        'london': {
            coords: '51.5074,-0.1278',
            bounds: '-0.3089,51.3833,0.0557,51.6074'  // Fixed London bounds
        },
        'dubai': {
            coords: '25.2048,55.2708',
            bounds: '55.0936,24.9857,55.4397,25.3473'  // Fixed Dubai bounds
        },
        'mumbai': {
            coords: '19.0760,72.8777',
            bounds: '72.7436,18.8921,72.9919,19.2771'  // Fixed Mumbai bounds
        },
        'sydney': {
            coords: '-33.8688,151.2093',
            bounds: '150.9842,-34.0459,151.3430,-33.7081'  // Fixed Sydney bounds
        }
    };

    for (const [cityId, cityInfo] of Object.entries(cities)) {
        const mapContainer = document.querySelector(`#${cityId} .map`);
        const mapEmbed = `<iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=${cityInfo.bounds}&layer=mapnik&marker=${cityInfo.coords}" 
            style="border:0; margin-left: 10px; width: 600px; height: 400px; border-radius: 5px;" 
            loading="lazy">
        </iframe>`;
        mapContainer.innerHTML = mapEmbed;
    }
}

function updateTimes() {
    const cities = {
        'nyc': 'America/New_York',
        'london': 'Europe/London',
        'dubai': 'Asia/Dubai',
        'mumbai': 'Asia/Kolkata',
        'sydney': 'Australia/Sydney'
    };

    for (const [cityId, timezone] of Object.entries(cities)) {
        const date = new Date();
        const time = date.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const dateStr = date.toLocaleDateString('en-US', {
            timeZone: timezone,
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const timeElement = document.querySelector(`#${cityId} .time`);
        timeElement.innerHTML = cityId === 'nyc' ? 
            `<span style="color: purple">${time}</span><br><span style="color: purple; font-size: 0.5em">${dateStr}</span>` :
            cityId === 'london' ?
            `<span style="color: #FF8C00">${time}</span><br><span style="color: #FF8C00; font-size: 0.5em">${dateStr}</span>` :
            `${time}<br><span style="font-size: 0.5em">${dateStr}</span>`;
    }
}

// Initialize maps once
initializeMaps();

// Update times immediately and then every second
updateTimes();
setInterval(updateTimes, 1000); 