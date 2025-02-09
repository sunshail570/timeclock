function initializeMaps() {
    const cities = {
        'nyc': {
            coords: '40.7128,-74.0060',
            bounds: '-74.2590,40.4774,-73.7004,40.9176'
        },
        'london': {
            coords: '51.5074,-0.1278',
            bounds: '-0.3089,51.3833,0.0557,51.6074'
        },
        'dubai': {
            coords: '25.2048,55.2708',
            bounds: '55.0936,24.9857,55.4397,25.3473'
        },
        'mumbai': {
            coords: '19.0760,72.8777',
            bounds: '72.7436,18.8921,72.9919,19.2771'
        },
        'sydney': {
            coords: '-33.8688,151.2093',
            bounds: '150.9842,-34.0459,151.3430,-33.7081'
        }
    };

    for (const [cityId, cityInfo] of Object.entries(cities)) {
        const mapContainer = document.querySelector(`#${cityId} .map`);
        const mapEmbed = `<iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=${cityInfo.bounds}&layer=mapnik&marker=${cityInfo.coords}" 
            style="border:0;" 
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
        
        // Format date consistently for all cities
        const dateOptions = {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        
        const dateObj = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const dateStr = dateObj.toLocaleDateString('en-US', dateOptions);

        const timeElement = document.querySelector(`#${cityId} .time`);
        const dateElement = document.querySelector(`#${cityId} .date`);
        
        timeElement.textContent = time;
        dateElement.textContent = dateStr;
    }
}

function addContact(cityId) {
    const name = prompt("Enter the name of your contact in this city:");
    if (name) {
        // Get existing contacts array or create new one
        const contacts = JSON.parse(localStorage.getItem(`${cityId}-contacts`) || '[]');
        contacts.push(name);
        // Save updated contacts array
        localStorage.setItem(`${cityId}-contacts`, JSON.stringify(contacts));
        // Update display
        displayContacts(cityId, contacts);
    }
}

function displayContacts(cityId, contacts) {
    const contactElement = document.getElementById(`${cityId}-contact`);
    if (contacts.length === 0) {
        contactElement.innerHTML = '';
        return;
    }
    
    const contactsList = contacts.map(name => `
        <div class="contact-item">
            ${name}
            <button class="remove-contact-btn" onclick="removeContact('${cityId}', '${name}')">×</button>
        </div>
    `).join('');
    
    contactElement.innerHTML = `
        <div class="contacts-header">Contacts:</div>
        <div class="contacts-list">${contactsList}</div>
    `;
}

function removeContact(cityId, nameToRemove) {
    const contacts = JSON.parse(localStorage.getItem(`${cityId}-contacts`) || '[]');
    const updatedContacts = contacts.filter(name => name !== nameToRemove);
    localStorage.setItem(`${cityId}-contacts`, JSON.stringify(updatedContacts));
    displayContacts(cityId, updatedContacts);
}

function loadSavedContacts() {
    const cities = ['nyc', 'london', 'dubai', 'mumbai', 'sydney'];
    cities.forEach(cityId => {
        const savedContacts = JSON.parse(localStorage.getItem(`${cityId}-contacts`) || '[]');
        displayContacts(cityId, savedContacts);
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';
    
    // Remove existing ripple
    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple effect to all Add Contact buttons
function initializeRippleButtons() {
    const buttons = document.querySelectorAll('.add-contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Initialize maps once
initializeMaps();

// Update times immediately and then every second
updateTimes();
setInterval(updateTimes, 1000);

// Add this to your existing window.onload or document.addEventListener('DOMContentLoaded', ...)
document.addEventListener('DOMContentLoaded', function() {
    loadSavedContacts();
    initializeRippleButtons();
    // ... your existing initialization code ...
}); 