// // const canvas = document.querySelector("canvas"),
// // toolBtns = document.querySelectorAll(".tool"),
// // fillColor = document.querySelector("#fill-color"),
// // sizeSlider = document.querySelector("#size-slider"),
// // colorBtns = document.querySelectorAll(".colors .option"),
// // colorPicker = document.querySelector("#color-picker"),
// // clearCanvas = document.querySelector(".clear-canvas"),
// // saveImg = document.querySelector(".save-img"),
// // ctx = canvas.getContext("2d");

// // // global variables with default value
// // let prevMouseX, prevMouseY, snapshot,
// // isDrawing = false,
// // selectedTool = "brush",
// // brushWidth = 5,
// // selectedColor = "#000";

// // const setCanvasBackground = () => {
// //     // setting whole canvas background to white, so the downloaded img background will be white
// //     ctx.fillStyle = "#fff";
// //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// //     ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
// // }

// window.addEventListener("load", () => {
//     // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//     setCanvasBackground();
// });

// // const drawRect = (e) => {
// //     // if fillColor isn't checked draw a rect with border else draw rect with background
// //     if(!fillColor.checked) {
// //         // creating circle according to the mouse pointer
// //         return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
// //     }
// //     ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
// // }

// // const drawCircle = (e) => {
// //     ctx.beginPath(); // creating new path to draw circle
// //     // getting radius for circle according to the mouse pointer
// //     let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
// //     ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
// //     fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
// // }

// // const drawTriangle = (e) => {
// //     ctx.beginPath(); // creating new path to draw circle
// //     ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
// //     ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
// //     ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
// //     ctx.closePath(); // closing path of a triangle so the third line draw automatically
// //     fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
// // }

// // const startDraw = (e) => {
// //     isDrawing = true;
// //     prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
// //     prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
// //     ctx.beginPath(); // creating new path to draw
// //     ctx.lineWidth = brushWidth; // passing brushSize as line width
// //     ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
// //     ctx.fillStyle = selectedColor; // passing selectedColor as fill style
// //     // copying canvas data & passing as snapshot value.. this avoids dragging the image
// //     snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
// // }

// // const drawing = (e) => {
// //     if(!isDrawing) return; // if isDrawing is false return from here
// //     ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

// //     if(selectedTool === "brush" || selectedTool === "eraser") {
// //         // if selected tool is eraser then set strokeStyle to white 
// //         // to paint white color on to the existing canvas content else set the stroke color to selected color
// //         ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
// //         ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
// //         ctx.stroke(); // drawing/filling line with color
// //     } else if(selectedTool === "rectangle"){
// //         drawRect(e);
// //     } else if(selectedTool === "circle"){
// //         drawCircle(e);
// //     } else {
// //         drawTriangle(e);
// //     }
// // }

// toolBtns.forEach(btn => {
//     btn.addEventListener("click", () => { // adding click event to all tool option
//         // removing active class from the previous option and adding on current clicked option
//         document.querySelector(".options .active").classList.remove("active");
//         btn.classList.add("active");
//         selectedTool = btn.id;
//     });
// });

// sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize

// colorBtns.forEach(btn => {
//     btn.addEventListener("click", () => { // adding click event to all color button
//         // removing selected class from the previous option and adding on current clicked option
//         document.querySelector(".options .selected").classList.remove("selected");
//         btn.classList.add("selected");
//         // passing selected btn background color as selectedColor value
//         selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
//     });
// });

// colorPicker.addEventListener("change", () => {
//     // passing picked color value from color picker to last color btn background
//     colorPicker.parentElement.style.background = colorPicker.value;
//     colorPicker.parentElement.click();
// });

// clearCanvas.addEventListener("click", () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
//     setCanvasBackground();
// });

// saveImg.addEventListener("click", () => {
//     const link = document.createElement("a"); // creating <a> element
//     link.download = `${Date.now()}.jpg`; // passing current date as link download value
//     link.href = canvas.toDataURL(); // passing canvasData as link href value
//     link.click(); // clicking link to download image
// });

// canvas.addEventListener("mousedown", startDraw);
// canvas.addEventListener("mousemove", drawing);
// canvas.addEventListener("mouseup", () => isDrawing = false);

// // // Selecting necessary elements
// // const zoomInBtn = document.querySelector(".zoom-in");
// // const zoomOutBtn = document.querySelector(".zoom-out");
// // const undoBtn = document.querySelector(".undo");
// // const redoBtn = document.querySelector(".redo");

// // // Global variables for zoom and history
// // let zoomLevel = 1;

// // Function to apply zoom to the canvas
// function applyZoom() {
//     canvas.width = canvas.offsetWidth * zoomLevel;
//     canvas.height = canvas.offsetHeight * zoomLevel;
//     ctx.scale(zoomLevel, zoomLevel); // Scale the drawing context
//     restoreCanvas(history[historyIndex]); // Restore the current state with zoom applied
// }

// // Zoom In functionality
// zoomInBtn.addEventListener("click", () => {
//     zoomLevel = Math.min(zoomLevel + 0.1, 3); // Cap the zoom level to 3x
//     applyZoom();
// });

// // Zoom Out functionality
// zoomOutBtn.addEventListener("click", () => {
//     zoomLevel = Math.max(zoomLevel - 0.1, 0.5); // Limit the minimum zoom level to 0.5x
//     applyZoom();
// });

// // Undo functionality
// undoBtn.addEventListener("click", () => {
//     if (historyIndex > 0) {
//         historyIndex--;
//         restoreCanvas(history[historyIndex]);
//     }
// });

// // Redo functionality
// redoBtn.addEventListener("click", () => {
//     if (historyIndex < history.length - 1) {
//         historyIndex++;
//         restoreCanvas(history[historyIndex]);
//     }
// });


// // Selecting necessary elements
// const canvas = document.querySelector("canvas"),
//     toolBtns = document.querySelectorAll(".tool"),
//     fillColor = document.querySelector("#fill-color"),
//     sizeSlider = document.querySelector("#size-slider"),
//     colorBtns = document.querySelectorAll(".colors .option"),
//     colorPicker = document.querySelector("#color-picker"),
//     clearCanvas = document.querySelector(".clear-canvas"),
//     saveImg = document.querySelector(".save-img"),
//     zoomInBtn = document.querySelector(".zoom-in"),
//     zoomOutBtn = document.querySelector(".zoom-out"),
//     undoBtn = document.querySelector(".undo"),
//     redoBtn = document.querySelector(".redo"),
//     ctx = canvas.getContext("2d");

// // Global variables with default values
// let prevMouseX, prevMouseY, snapshot,
//     isDrawing = false,
//     selectedTool = "brush",
//     brushWidth = 5,
//     selectedColor = "#000",
//     history = [], // Store history of canvas states for undo/redo
//     historyIndex = -1, // Current history index
//     zoomLevel = 1; // Default zoom level

// // Set the initial canvas background color
// const setCanvasBackground = () => {
//     ctx.fillStyle = "#fff"; // White background color
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = selectedColor; // Reset brush color
// };

// // Initialize canvas dimensions and save the initial state
// window.addEventListener("load", () => {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//     setCanvasBackground();
//     saveHistory(); // Save the initial canvas state
// });

// // Save the current state of the canvas for undo/redo
// function saveHistory() {
//     if (historyIndex < history.length - 1) {
//         history.splice(historyIndex + 1); // Remove redo states
//     }
//     history.push(canvas.toDataURL()); // Save canvas data as an image URL
//     historyIndex++;
// }

// // Restore the canvas state from history
// function restoreCanvas(imageURL) {
//     const img = new Image(); // Create a new image
//     img.src = imageURL; // Set the image source to the saved state
//     img.onload = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
//         ctx.drawImage(img, 0, 0); // Draw the saved state onto the canvas
//     };
// }

// // Apply zoom effect to the canvas
// function applyZoom() {
//     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
//     canvas.width = canvas.offsetWidth * zoomLevel; // Adjust canvas width based on zoom level
//     canvas.height = canvas.offsetHeight * zoomLevel; // Adjust canvas height based on zoom level
//     ctx.putImageData(imgData, 0, 0); // Restore saved data onto canvas
//     ctx.scale(zoomLevel, zoomLevel); // Apply the scaling effect
// }

// // Zoom In functionality
// zoomInBtn.addEventListener("click", () => {
//     zoomLevel = Math.min(zoomLevel + 0.1, 3); // Cap the zoom level to 3x
//     applyZoom();
// });

// // Zoom Out functionality
// zoomOutBtn.addEventListener("click", () => {
//     zoomLevel = Math.max(zoomLevel - 0.1, 0.5); // Limit the minimum zoom level to 0.5x
//     applyZoom();
// });

// // Undo functionality
// undoBtn.addEventListener("click", () => {
//     if (historyIndex > 0) { // Check if there's an earlier state to undo
//         historyIndex--;
//         restoreCanvas(history[historyIndex]); // Restore the previous state
//     }
// });

// // Redo functionality
// redoBtn.addEventListener("click", () => {
//     if (historyIndex < history.length - 1) { // Check if there's a state to redo
//         historyIndex++;
//         restoreCanvas(history[historyIndex]); // Restore the next state
//     }
// });

// // Start drawing
// const startDraw = (e) => {
//     isDrawing = true;
//     prevMouseX = e.offsetX; // Store current mouse X position
//     prevMouseY = e.offsetY; // Store current mouse Y position
//     ctx.beginPath(); // Start a new drawing path
//     ctx.lineWidth = brushWidth; // Set line width
//     ctx.strokeStyle = selectedColor; // Set stroke color
//     ctx.fillStyle = selectedColor; // Set fill color
//     snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
// };

// // Drawing functionality
// const drawing = (e) => {
//     if (!isDrawing) return; // If not drawing, return early
//     ctx.putImageData(snapshot, 0, 0); // Restore canvas data from snapshot

//     if (selectedTool === "brush" || selectedTool === "eraser") {
//         ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor; // Set stroke style
//         ctx.lineTo(e.offsetX, e.offsetY); // Draw line to the new position
//         ctx.stroke(); // Draw the stroke
//     } else if (selectedTool === "rectangle") {
//         drawRect(e);
//     } else if (selectedTool === "circle") {
//         drawCircle(e);
//     } else {
//         drawTriangle(e);
//     }
// };

// // Complete the remaining drawing functions...

// // Selecting necessary elements
// const canvas = document.querySelector("canvas"),
//     toolBtns = document.querySelectorAll(".tool"),
//     fillColor = document.querySelector("#fill-color"),
//     sizeSlider = document.querySelector("#size-slider"),
//     colorBtns = document.querySelectorAll(".colors .option"),
//     colorPicker = document.querySelector("#color-picker"),
//     clearCanvas = document.querySelector(".clear-canvas"),
//     saveImg = document.querySelector(".save-img"),
//     zoomInBtn = document.querySelector(".zoom-in"),
//     zoomOutBtn = document.querySelector(".zoom-out"),
//     undoBtn = document.querySelector(".undo"),
//     redoBtn = document.querySelector(".redo"),
//     ctx = canvas.getContext("2d");

// // Global variables with default values
// let prevMouseX, prevMouseY, snapshot,
//     isDrawing = false,
//     selectedTool = "brush",
//     brushWidth = 5,
//     selectedColor = "#000",
//     history = [], // Store history of canvas states for undo/redo
//     historyIndex = -1, // Current history index
//     zoomLevel = 1; // Default zoom level

// // Set the initial canvas background color
// const setCanvasBackground = () => {
//     ctx.fillStyle = "#fff"; // White background color
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = selectedColor; // Reset brush color
// };

// // Initialize canvas dimensions and save the initial state
// window.addEventListener("load", () => {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//     setCanvasBackground();
//     saveHistory(); // Save the initial canvas state
// });

// // Save the current state of the canvas for undo/redo
// function saveHistory() {
//     if (historyIndex < history.length - 1) {
//         history.splice(historyIndex + 1); // Remove redo states
//     }
//     history.push(canvas.toDataURL()); // Save canvas data as an image URL
//     historyIndex++;
// }

// // Restore the canvas state from history
// function restoreCanvas(imageURL) {
//     const img = new Image(); // Create a new image
//     img.src = imageURL; // Set the image source to the saved state
//     img.onload = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
//         ctx.drawImage(img, 0, 0); // Draw the saved state onto the canvas
//     };
// }

// // Apply zoom effect to the canvas
// function applyZoom() {
//     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
//     const originalWidth = canvas.offsetWidth;
//     const originalHeight = canvas.offsetHeight;
    
//     canvas.width = originalWidth * zoomLevel; // Adjust canvas width based on zoom level
//     canvas.height = originalHeight * zoomLevel; // Adjust canvas height based on zoom level

//     ctx.putImageData(imgData, 0, 0); // Restore saved data onto canvas
//     ctx.scale(zoomLevel, zoomLevel); // Apply the scaling effect
// }

// // Zoom In functionality
// zoomInBtn.addEventListener("click", () => {
//     zoomLevel = Math.min(zoomLevel + 0.1, 3); // Cap the zoom level to 3x
//     applyZoom();
// });

// // Zoom Out functionality
// zoomOutBtn.addEventListener("click", () => {
//     zoomLevel = Math.max(zoomLevel - 0.1, 0.5); // Limit the minimum zoom level to 0.5x
//     applyZoom();
// });

// // Undo functionality
// undoBtn.addEventListener("click", () => {
//     if (historyIndex > 0) { // Check if there's an earlier state to undo
//         historyIndex--;
//         restoreCanvas(history[historyIndex]); // Restore the previous state
//     }
// });

// // Redo functionality
// redoBtn.addEventListener("click", () => {
//     if (historyIndex < history.length - 1) { // Check if there's a state to redo
//         historyIndex++;
//         restoreCanvas(history[historyIndex]); // Restore the next state
//     }
// });

// // Start drawing
// const startDraw = (e) => {
//     isDrawing = true;
//     prevMouseX = e.offsetX; // Store current mouse X position
//     prevMouseY = e.offsetY; // Store current mouse Y position
//     ctx.beginPath(); // Start a new drawing path
//     ctx.lineWidth = brushWidth; // Set line width
//     ctx.strokeStyle = selectedColor; // Set stroke color
//     ctx.fillStyle = selectedColor; // Set fill color
//     snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
// };

// // Drawing functionality
// const drawing = (e) => {
//     if (!isDrawing) return; // If not drawing, return early
//     ctx.putImageData(snapshot, 0, 0); // Restore canvas data from snapshot

//     if (selectedTool === "brush" || selectedTool === "eraser") {
//         ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor; // Set stroke style
//         ctx.lineTo(e.offsetX, e.offsetY); // Draw line to the new position
//         ctx.stroke(); // Draw the stroke
//     } else if (selectedTool === "rectangle") {
//         drawRect(e);
//     } else if (selectedTool === "circle") {
//         drawCircle(e);
//     } else {
//         drawTriangle(e);
//     }
// };

// // Function to draw a rectangle
// const drawRect = (e) => {
//     if (!fillColor.checked) {
//         ctx.strokeRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
//     } else {
//         ctx.fillRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
//     }
// };

// // Function to draw a circle
// const drawCircle = (e) => {
//     ctx.beginPath(); // Create a new path to draw circle
//     let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2)); // Calculate radius
//     ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // Create circle according to the mouse pointer
//     fillColor.checked ? ctx.fill() : ctx.stroke(); // Fill or stroke the circle
// };

// // Function to draw a triangle
// const drawTriangle = (e) => {
//     ctx.beginPath(); // Create a new path to draw triangle
//     ctx.moveTo(prevMouseX, prevMouseY); // Move to the starting point
//     ctx.lineTo(e.offsetX, e.offsetY); // Draw the first line
//     ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Draw the bottom line
//     ctx.closePath(); // Close the path of the triangle
//     fillColor.checked ? ctx.fill() : ctx.stroke(); // Fill or stroke the triangle
// };

// // Event listeners for tool buttons
// toolBtns.forEach(btn => {
//     btn.addEventListener("click", () => { // Adding click event to all tool options
//         document.querySelector(".options .active").classList.remove("active"); // Remove active class
//         btn.classList.add("active"); // Add active class to the selected tool
//         selectedTool = btn.id; // Set the selected tool
//     });
// });

// // Brush size adjustment
// sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // Set brush width based on slider value

// // Color selection event listener
// colorBtns.forEach(btn => {
//     btn.addEventListener("click", () => { // Adding click event to all color buttons
//         document.querySelector(".options .selected").classList.remove("selected"); // Remove selected class
//         btn.classList.add("selected"); // Add selected class to the clicked button
//         selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color"); // Get selected color
//     });
// });

// // Color picker event listener
// colorPicker.addEventListener("change", () => {
//     colorPicker.parentElement.style.background = colorPicker.value; // Change color button background
//     colorPicker.parentElement.click(); // Simulate click on the button
// });

// // Clear canvas functionality
// clearCanvas.addEventListener("click", () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//     setCanvasBackground(); // Reset background
//     saveHistory(); // Save the cleared state
// });

// // Save image functionality
// saveImg.addEventListener("click", () => {
//     const link = document.createElement("a"); // Create <a> element
//     link.download = `${Date.now()}.jpg`; // Set download filename
//     link.href = canvas.toDataURL(); // Set link href to canvas data URL
//     link.click(); // Trigger the download
// });

// // Mouse event listeners for drawing
// canvas.addEventListener("mousedown", startDraw);
// canvas.addEventListener("mousemove", drawing);
// canvas.addEventListener("mouseup", () => {
//     isDrawing = false; // Stop drawing
//     saveHistory(); // Save the canvas state after drawing
// });


// Selecting necessary elements
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    zoomInBtn = document.querySelector(".zoom-in"),
    zoomOutBtn = document.querySelector(".zoom-out"),
    undoBtn = document.querySelector(".undo"),
    redoBtn = document.querySelector(".redo"),
    ctx = canvas.getContext("2d");

// Global variables with default values
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000",
    history = [], // Store history of canvas states for undo/redo
    historyIndex = -1, // Current history index
    zoomLevel = 1; // Default zoom level

// Set the initial canvas background color
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff"; // White background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // Reset brush color
};

// Initialize canvas dimensions and save the initial state
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
    saveHistory(); // Save the initial canvas state
});

// Save the current state of the canvas for undo/redo
function saveHistory() {
    // Ensure history is managed correctly
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1); // Keep only up to the current index
    }
    history.push(canvas.toDataURL()); // Save canvas data as an image URL
    historyIndex++; // Move to the new history index
}

// Restore the canvas state from history
function restoreCanvas(imageURL) {
    const img = new Image(); // Create a new image
    img.src = imageURL; // Set the image source to the saved state
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.drawImage(img, 0, 0); // Draw the saved state onto the canvas
    };
}

// Apply zoom effect to the canvas
function applyZoom() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
    const originalWidth = canvas.offsetWidth;
    const originalHeight = canvas.offsetHeight;

    canvas.width = originalWidth * zoomLevel; // Adjust canvas width based on zoom level
    canvas.height = originalHeight * zoomLevel; // Adjust canvas height based on zoom level

    ctx.putImageData(imgData, 0, 0); // Restore saved data onto canvas
}

// Zoom In functionality
zoomInBtn.addEventListener("click", () => {
    zoomLevel = Math.min(zoomLevel + 0.1, 3); // Cap the zoom level to 3x
    applyZoom();
});

// Zoom Out functionality
zoomOutBtn.addEventListener("click", () => {
    zoomLevel = Math.max(zoomLevel - 0.1, 0.5); // Limit the minimum zoom level to 0.5x
    applyZoom();
});

// Undo functionality
undoBtn.addEventListener("click", () => {
    if (historyIndex > 0) { // Check if there's an earlier state to undo
        historyIndex--;
        restoreCanvas(history[historyIndex]); // Restore the previous state
    }
});

// Redo functionality
redoBtn.addEventListener("click", () => {
    if (historyIndex < history.length - 1) { // Check if there's a state to redo
        historyIndex++;
        restoreCanvas(history[historyIndex]); // Restore the next state
    }
});

// Start drawing
const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Store current mouse X position
    prevMouseY = e.offsetY; // Store current mouse Y position
    ctx.beginPath(); // Start a new drawing path
    ctx.lineWidth = brushWidth; // Set line width
    ctx.strokeStyle = selectedColor; // Set stroke color
    ctx.fillStyle = selectedColor; // Set fill color
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save current canvas data
};

// Drawing functionality
const drawing = (e) => {
    if (!isDrawing) return; // If not drawing, return early
    ctx.putImageData(snapshot, 0, 0); // Restore canvas data from snapshot

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor; // Set stroke style
        ctx.lineTo(e.offsetX, e.offsetY); // Draw line to the new position
        ctx.stroke(); // Draw the stroke
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
};

// Function to draw a rectangle
const drawRect = (e) => {
    if (!fillColor.checked) {
        ctx.strokeRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
    } else {
        ctx.fillRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY);
    }
};

// Function to draw a circle
const drawCircle = (e) => {
    ctx.beginPath(); // Create a new path to draw circle
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2)); // Calculate radius
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // Create circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Fill or stroke the circle
};

// Function to draw a triangle
const drawTriangle = (e) => {
    ctx.beginPath(); // Create a new path to draw triangle
    ctx.moveTo(prevMouseX, prevMouseY); // Move to the starting point
    ctx.lineTo(e.offsetX, e.offsetY); // Draw the first line
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Draw the bottom line
    ctx.closePath(); // Close the path of the triangle
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Fill or stroke the triangle
};

// Event listeners for tool buttons
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Adding click event to all tool options
        document.querySelector(".options .active").classList.remove("active"); // Remove active class
        btn.classList.add("active"); // Add active class to the selected tool
        selectedTool = btn.id; // Set the selected tool
    });
});

// Brush size adjustment
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // Set brush width based on slider value

// Color selection event listener
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Adding click event to all color buttons
        document.querySelector(".options .selected").classList.remove("selected"); // Remove selected class
        btn.classList.add("selected"); // Add selected class to the clicked button
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color"); // Get selected color
    });
});

// Color picker event listener
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value; // Change color button background
    colorPicker.parentElement.click(); // Simulate click on the button
});

// Clear canvas functionality
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    setCanvasBackground(); // Reset background
    history = []; // Clear history when canvas is cleared
    historyIndex = -1; // Reset history index
});

// Save image functionality
saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // Create <a> element
    link.download = `${Date.now()}.jpg`; // Set download filename
    link.href = canvas.toDataURL(); // Set link href to canvas data URL
    link.click(); // Trigger the download
});

// Mouse event listeners for drawing
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => {
    isDrawing = false; // Stop drawing
    saveHistory(); // Save the canvas state after drawing
});

// Undo functionality
undoBtn.addEventListener("click", () => {
    if (historyIndex > 0) { // Check if there's an earlier state to undo
        historyIndex--;
        restoreCanvas(history[historyIndex]); // Restore the previous state
    }
});

// Redo functionality
redoBtn.addEventListener("click", () => {
    if (historyIndex < history.length - 1) { // Check if there's a state to redo
        historyIndex++;
        restoreCanvas(history[historyIndex]); // Restore the next state
    }
});