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
        } else {
            loadCarData();
            setupSearch();
        }
    }
});

// CAR DATA - 11 CARS (All working image URLs)
const carData = [
    {
        name: "BMW M5",
        engine: "4.4L V8 Twin-Turbo",
        topSpeed: "305 km/h",
        country: "Germany",
        price: "$105,000",
        image: "https://images.pexels.com/photos/30166138/pexels-photo-30166138.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        name: "Tesla Model S",
        engine: "Dual Electric Motors",
        topSpeed: "322 km/h",
        country: "USA",
        price: "$94,990",
        image: "https://cdn.pixabay.com/photo/2021/01/15/16/49/tesla-5919764_1280.jpg"
    },
    {
        name: "Tata Nexon EV",
        engine: "Permanent Magnet AC Motor",
        topSpeed: "120 km/h",
        country: "India",
        price: "$18,000",
        image: "https://images.autox.com/uploads/2023/09/Tata-Nexon-Right-Front-Three-Quarter.jpg"
    },
    {
        name: "Mahindra Thar",
        engine: "2.0L mStallion Turbo Petrol",
        topSpeed: "155 km/h",
        country: "India",
        price: "$25,000",
        image: "https://images.pexels.com/photos/33101188/pexels-photo-33101188.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        name: "Porsche 911",
        engine: "3.0L Twin-Turbo Flat-6",
        topSpeed: "293 km/h",
        country: "Germany",
        price: "$107,550",
        image: "https://hips.hearstapps.com/hmg-prod/images/2025-porsche-911-carrera-gts-145-68af3df4bea4b.jpg"
    },
    {
        name: "Toyota Supra",
        engine: "3.0L Inline-6 Turbo",
        topSpeed: "250 km/h",
        country: "Japan",
        price: "$43,540",
        image: "https://images.pexels.com/photos/13627440/pexels-photo-13627440.jpeg"
    },
    {
        name: "Mercedes AMG GT",
        engine: "4.0L V8 Biturbo",
        topSpeed: "318 km/h",
        country: "Germany",
        price: "$115,900",
        image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg"
    },
    {
        name: "Audi R8",
        engine: "5.2L V10",
        topSpeed: "330 km/h",
        country: "Germany",
        price: "$169,900",
        image: "https://images.pexels.com/photos/10566898/pexels-photo-10566898.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        name: "Ford Mustang",
        engine: "5.0L V8",
        topSpeed: "249 km/h",
        country: "USA",
        price: "$47,100",
        image: "https://editorial.pxcrush.net/carsales/general/editorial/2024-ford-mustang-gt-fastback-auto-45.jpg"
    },
    {
        name: "Lamborghini Huracan",
        engine: "5.2L V10",
        topSpeed: "325 km/h",
        country: "Italy",
        price: "$261,274",
        image: "https://images.pexels.com/photos/17632045/pexels-photo-17632045.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        name: "Hyundai Creta",
        engine: "1.5L Petrol",
        topSpeed: "180 km/h",
        country: "South Korea",
        price: "$20,000",
        image: "https://images.pexels.com/photos/1134857/pexels-photo-1134857.jpeg"
    }
];

// SEARCH FUNCTIONALITY
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value.toLowerCase());
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value.toLowerCase());
            }
        });
    }
}

function performSearch(searchTerm) {
    const filteredCars = carData.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.country.toLowerCase().includes(searchTerm) ||
        car.engine.toLowerCase().includes(searchTerm) ||
        car.price.toLowerCase().includes(searchTerm)
    );
    
    displayCars(filteredCars);
    updateResultCount(filteredCars.length);
}

function updateResultCount(count) {
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = `Showing ${count} of ${carData.length} cars`;
    }
}

// Load and display car data
function loadCarData() {
    if (!document.getElementById('carsContainer')) return;
    
    displayCars(carData);
    updateResultCount(carData.length);
}

function displayCars(carsToDisplay) {
    const container = document.getElementById('carsContainer');
    container.innerHTML = '';
    
    if (carsToDisplay.length === 0) {
        container.innerHTML = '<p class="no-results">No cars found matching your search.</p>';
        return;
    }
    
    carsToDisplay.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image" onerror="this.src='https://images.unsplash.com/photo-1563720223488-8f2f62a6e71a?w=600&h=400&fit=crop'">
            <h2 class="car-name">${car.name}</h2>
            <div class="car-spec">
                <span class="spec-label">Engine:</span>
                <span class="spec-value">${car.engine}</span>
            </div>
            <div class="car-spec">
                <span class="spec-label">Top Speed:</span>
                <span class="spec-value">${car.topSpeed}</span>
            </div>
            <div class="car-spec">
                <span class="spec-label">Price:</span>
                <span class="spec-value price-tag">${car.price}</span>
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
