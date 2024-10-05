
const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
zoomInBtn = document.querySelector("#zoom-in"),
zoomOutBtn = document.querySelector("#zoom-out");
textEditor=document.getElementById("text-options")
ctx = canvas.getContext("2d");

// global variables with default value
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 2,
selectedColor = "#000";
let scale = 1;

// Stack to store undo and redo actions
let undoStack = [];
let redoStack = [];



        // Resize canvas to fill window
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth - 250; // Adjust canvas width
            canvas.height = window.innerHeight;
        });
        canvas.width = window.innerWidth - 250; // Initial canvas width
        canvas.height = window.innerHeight;

        const saveState = () => {
            undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            redoStack = []; // Clear redo stack as new action has been taken
        };

        const undo = () => {
            if (undoStack.length > 0) {
                redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save current state to redo stack
                let prevState = undoStack.pop(); // Get the last state from undo stack
                ctx.putImageData(prevState, 0, 0); // Restore the previous state
            }
        };

        const redo = () => {
            if (redoStack.length > 0) {
                undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save current state to undo stack
                let nextState = redoStack.pop(); // Get the last state from redo stack
                ctx.putImageData(nextState, 0, 0); // Restore the next state
            }
        };


const setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
}

window.addEventListener("load", () => {
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    // if fillColor isn't checked draw a rect with border else draw rect with background
    if(!fillColor.checked) {
        // creating circle according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}

const drawLine = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

const drawArrow = (e) => {
drawLine(e); // draw the line part of the arrow
const headLength = 25;
const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);

ctx.beginPath();
ctx.moveTo(e.offsetX, e.offsetY);
ctx.lineTo(e.offsetX - headLength * Math.cos(angle - Math.PI / 6), e.offsetY - headLength * Math.sin(angle - Math.PI / 6));
ctx.moveTo(e.offsetX, e.offsetY);
ctx.lineTo(e.offsetX - headLength * Math.cos(angle + Math.PI / 6), e.offsetY - headLength * Math.sin(angle + Math.PI / 6));
ctx.stroke();
}


const startDraw = (e) => {
    saveState(); // Save current state before drawing
    isDrawing = true;
    prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = brushWidth; // passing brushSize as line width
    ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
    ctx.fillStyle = selectedColor; // passing selectedColor as fill style
    // copying canvas data & passing as snapshot value.. this avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

    if(selectedTool === "brush" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else if (selectedTool === "triangle") {
          drawTriangle(e);
        } else if (selectedTool === "line") {
          drawLine(e);
        } else if (selectedTool === "arrow") {
          drawArrow(e);
        }
}




let isTextToolActive = false;
let currentTextField = null;

// Event listener for the text tool
document.querySelector("#text-tool").addEventListener("click", () => {
    isTextToolActive = true;
    // document.getElementById("text-options").style.display = "block"; // Show text options
    toolBtns.forEach(t => t.classList.remove("active"));
    document.querySelector("#text-tool").classList.add("active");
});

// Event listener for clicking on the canvas
canvas.addEventListener("click", (e) => {
   document.getElementById("sticky-note-container").style.display="none"
    if (isTextToolActive) {
        // Create a new input field where the user clicks
        const inputField = document.createElement("input");
        inputField.type = "text";

        inputField.style.position = "absolute";
        inputField.style.marginBottom="10x"
        inputField.style.left = e.pageX + "px";
        inputField.style.top = e.pageY + "px";
        inputField.style.fontSize = document.getElementById("font-size").value + "px";
        inputField.style.fontFamily = document.getElementById("font-family").value;
        inputField.style.fontWeight = document.getElementById("font-weight").value;
        textEditor.style.position = "absolute";
        textEditor.style.left = e.pageX + "px";
        textEditor.style.top = (e.pageY - 60) + "px"; // 10 pixels above the input field
        document.getElementById("text-options").style.display = "block"; // Show text options
        

        document.body.appendChild(inputField);
        inputField.focus();
        currentTextField = inputField;

        // Remove input when user presses Enter
        inputField.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                drawTextOnCanvas(inputField.value, e.offsetX, e.offsetY);
                document.body.removeChild(inputField);
                currentTextField = null;
                document.getElementById("text-options").style.display = "none"; 
                inputField.style.border="none"
                isTextToolActive = false;
               
            }
        });
    }
});

// Function to draw the text on the canvas
function drawTextOnCanvas(text, x, y) {
    ctx.font = `${document.getElementById("font-weight").value} ${document.getElementById("font-size").value}px ${document.getElementById("font-family").value}`;
    ctx.fillText(text, x, y);
}

// Update font settings on change
document.querySelectorAll("#font-size, #font-family, #font-weight").forEach(select => {
    select.addEventListener("change", () => {
        
        if (currentTextField) {
           
            currentTextField.style.fontSize = document.getElementById("font-size").value + "px";
            currentTextField.style.fontFamily = document.getElementById("font-family").value;
            currentTextField.style.fontWeight = document.getElementById("font-weight").value;
        }
    });
});









toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all tool option
        // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});




clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    // setCanvasBackground();
    undoStack = []; // Clear undo stack
    redoStack = []; // Clear redo stack
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg`; // passing current date as link download value
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

// Event listeners for Undo and Redo buttons
const undoBtn = document.querySelector(".undo-btn");
const redoBtn = document.querySelector(".redo-btn");

// Zoom In and Out functionality
zoomInBtn.addEventListener("click", () => {
    scale *= 1.2; // Increase scale
    canvas.style.transform = `scale(${scale})`;
});

zoomOutBtn.addEventListener("click", () => {
            scale /= 1.2; // Decrease scale
            canvas.style.transform = `scale(${scale})`;
        });


undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);


document.getElementById("show-sticky").addEventListener("click",function(){
  document.getElementById("sticky-note-container").style.display="block"
  document.getElementById("sticky-note-container").style.backgroundColor="wheat"
  document.getElementById("sticky-note-container").style.width="280px"
  
  document.getElementById("add-note-btn").style.display="block"
  

});


 // Function to create and add a sticky note
 document.getElementById('add-note-btn').addEventListener('click', function () {
            const noteContainer = document.getElementById('sticky-note-container');

            // Create a new sticky note
            const newNote = document.createElement('div');
            newNote.classList.add('sticky-note');
            newNote.innerHTML = `
                <textarea placeholder="Write your note here..."></textarea>
                <button class="close-btn">X</button>
            `;

            // Add the new sticky note to the container
            noteContainer.appendChild(newNote);

            // Handle close button functionality to remove the note
            const closeBtn = newNote.querySelector('.close-btn');
            closeBtn.addEventListener('click', function () {
                noteContainer.removeChild(newNote); // Remove the specific sticky note
            });
        });

// Function to draw uploaded images on the canvas
const drawImageOnCanvas = (img) => {
    const imgX = (canvas.width - img.width) / 2; // Center the image on the canvas
    const imgY = (canvas.height - img.height) / 2; // Center the image on the canvas
    ctx.drawImage(img, imgX, imgY); // Draw the image at calculated position
};

// Handle image upload
document.getElementById("image-upload").addEventListener("change", (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        const img = new Image(); // Create a new Image object
        img.src = URL.createObjectURL(file); // Create a URL for the image
        img.onload = () => {
            drawImageOnCanvas(img); // Draw the image once it's loaded
            URL.revokeObjectURL(img.src); // Clean up the URL
        };
    }
});
