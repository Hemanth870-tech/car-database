// Handle login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic authentication
            if (username === 'admin' && password === 'password') {
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials! Try admin/password');
            }
        });
    }
    
    // Check authentication on dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        
        if (isAuthenticated !== 'true') {
            window.location.href = 'index.html';
        }
    }
    
    // Load car data
    loadCarData();
});

// Car data
const carData = [
    {
        name: "BMW M5",
        engine: "4.4L V8 Twin-Turbo",
        topSpeed: "305 km/h",
        country: "Germany",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"
    },
    {
        name: "Tesla Model S",
        engine: "Dual Electric Motors",
        topSpeed: "322 km/h",
        country: "USA",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop"
    },
    {
        name: "Tata Nexon EV",
        engine: "Permanent Magnet AC Motor",
        topSpeed: "120 km/h",
        country: "India",
        image: "https://images.unsplash.com/photo-1563720223488-8f2f62a6e71a?w=600&h=400&fit=crop"
    },
    {
        name: "Mahindra Thar",
        engine: "2.0L mStallion Turbo Petrol",
        topSpeed: "155 km/h",
        country: "India",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop"
    },
    {
        name: "Porsche 911",
        engine: "3.0L Twin-Turbo Flat-6",
        topSpeed: "293 km/h",
        country: "Germany",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
    },
    {
        name: "Toyota Supra",
        engine: "3.0L Inline-6 Turbo",
        topSpeed: "250 km/h",
        country: "Japan",
        image: "https://images.unsplash.com/photo-1617650728462-2479c4eab7e2?w=600&h=400&fit=crop"
    }
];

// Load and display car data
function loadCarData() {
    if (!document.getElementById('carsContainer')) return;
    
    const container = document.getElementById('carsContainer');
    container.innerHTML = '';
    
    carData.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <h2 class="car-name">${car.name}</h2>
            <div class="car-spec">
                <span class="spec-label">Engine:</span>
                <span class="spec-value">${car.engine}</span>
            </div>
            <div class="car-spec">
                <span class="spec-label">Top Speed:</span>
                <span class="spec-value">${car.topSpeed}</span>
            </div>
            <div class="country-badge">${car.country}</div>
        `;
        
        container.appendChild(carCard);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'index.html';
}
