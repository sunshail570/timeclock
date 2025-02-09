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

// Update times immediately and then every second
updateTimes();
setInterval(updateTimes, 1000); 