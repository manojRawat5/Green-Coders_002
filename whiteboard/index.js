// Grab necessary elements
const menuToggle = document.getElementById('menuToggle');
const circleIcon = document.getElementById('circle');
const rectangleIcon = document.getElementById('rectangle');
const sidebar = document.getElementById('sidebar');

// Flag to check sidebar state
let isSidebarOpen = false;

// Function to update sidebar content and show it
function updateSidebar(content) {
    sidebar.innerHTML = content;
    sidebar.classList.add('sidebar-active'); // Show the sidebar
    isSidebarOpen = true; // Set flag to true when sidebar is open
}

// Function to hide the sidebar
function hideSidebar() {
    sidebar.classList.remove('sidebar-active'); // Hide the sidebar
    isSidebarOpen = false; // Set flag to false when sidebar is closed
}

// Default sidebar content when menu icon is clicked (with toggle functionality)
menuToggle.addEventListener('click', () => {
    if (isSidebarOpen) {
        hideSidebar(); // If sidebar is open, close it
    } else {
        const defaultContent = `
            <ul>
                <li><a href="#"><i class="fa-solid fa-folder"></i>Open</a></li>
                <li><a href="#"><i class="fa-solid fa-download"></i>Save to...</a></li>
                <li><a href="#"><i class="fa-solid fa-file-export"></i>Export image...</a></li>
                <li><a href="#"><i class="fa-solid fa-user-plus"></i>Live collaboration...</a></li>
                <li><a href="#"><i class="fa-solid fa-circle-question"></i>Help</a></li>
                <li><a href="#"><i class="fa-solid fa-trash"></i>Reset the canvas</a></li>
                <li><a href="#"><i class="fa-solid fa-user"></i>Sign in</a></li>
            </ul>
        `;
        updateSidebar(defaultContent); // Show the default content
    }
});

circleIcon.addEventListener('click', () => {
    const circleContent = `
        <ul>
            <li>
                <label for="stroke-color">Stroke Color:</label>
                <input type="color" id="stroke-color" name="stroke-color" value="#000000">
            </li>
            <li>
                <label for="fill-color">Fill Color:</label>
                <input type="color" id="fill-color" name="fill-color" value="#ffffff">
            </li>
            <li>
                <label for="stroke-width">Stroke Width:</label>
                <input type="range" id="stroke-width" name="stroke-width" min="1" max="10" value="2">
            </li>
        </ul>
    `;
    updateSidebar(circleContent); // Update the sidebar for circle properties
});

// Add click event listener to the rectangle icon
rectangleIcon.addEventListener('click', () => {
    const rectangleContent = `
        <ul>
            <li>
                <label for="stroke-color">Stroke Color:</label>
                <input type="color" id="stroke-color" name="stroke-color" value="#000000">
            </li>
            <li>
                <label for="fill-color">Fill Color:</label>
                <input type="color" id="fill-color" name="fill-color" value="#ffffff">
            </li>
            <li>
                <label for="stroke-width">Stroke Width:</label>
                <input type="range" id="stroke-width" name="stroke-width" min="1" max="10" value="2">
            </li>
            <li>
                <label for="border-radius">Border Radius:</label>
                <input type="range" id="border-radius" name="border-radius" min="0" max="50" value="5">
            </li>
        </ul>
    `;
    updateSidebar(rectangleContent); // Update the sidebar for rectangle properties
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideMenu = menuToggle.contains(event.target);
    const isClickInsideMidMenu = event.target.closest('.nav_mid');

    if (!isClickInsideSidebar && !isClickInsideMenu && !isClickInsideMidMenu) {
        hideSidebar();
    }
});


const addMemberBtn = document.querySelector('.nav_right button');
const addMemberPopup = document.getElementById('addMemberPopup');
const closePopup = document.getElementById('closePopup');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const users = [
    { username: 'johndoe', name: 'John Doe' },
    { username: 'janedoe', name: 'Jane Doe' },
    { username: 'bobsmith', name: 'Bob Smith' },
];

addMemberBtn.addEventListener('click', () => {
    addMemberPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    addMemberPopup.style.display = 'none';
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm) || 
        user.name.toLowerCase().includes(searchTerm)
    );
    displaySearchResults(filteredUsers);
});

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(user => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <span>${user.name} (${user.username})</span>
            <button class="add-member-btn">Add</button>
        `;
        searchResults.appendChild(resultItem);
    });
}

window.addEventListener('click', (e) => {
    if (e.target === addMemberPopup) {
        addMemberPopup.style.display = 'none';
    }
});