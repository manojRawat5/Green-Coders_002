const start_drawing_btn = document.getElementById("start_drawing")

start_drawing_btn.addEventListener("click", function(){
    window.location.href = "/whiteboard/index.html"
})



// Handling menu for small screen

const menuIcon = document.getElementById("menu_icon");
const small_screen_links = document.getElementById("small_screen_links");

menuIcon.addEventListener("click", function () {
  const currentDisplay = window.getComputedStyle(small_screen_links).display;
  
  if (currentDisplay === "none") {
    small_screen_links.style.display = "flex";
  } else {
    small_screen_links.style.display = "none";
  }
});


window.addEventListener("click", function(e){
   if(!small_screen_links.contains(e.target) && !menuIcon.contains(e.target)){
    small_screen_links.style.display = "none"
   }
})


window.addEventListener("resize", function () {
    if (window.innerWidth > 668) {
      small_screen_links.style.display = "none";
    }
  });


  // authentication

  let signup = document.querySelector("#signup");
  let signupSmall = document.querySelector("#signup_small");
  let idToken = localStorage.getItem("idToken");
  let whiteboardLarge = document.querySelector('#whiteboard_large');
  let whiteboardSmall = document.querySelector('#whiteboard_small');
  
  if (idToken) {
    signup.href = '';
    signup.textContent = 'Log Out';
    signupSmall.href = '';
    signupSmall.textContent = 'Log Out';
    
    whiteboardLarge.href = '../whiteboard/index.html';
    whiteboardSmall.href = '../whiteboard/index.html';
  } else {
    signup.href = '../signup/signup.html';
    signup.textContent = 'Sign Up';
    signupSmall.href = '../signup/signup.html';
    signupSmall.textContent = 'Sign Up';
    
    whiteboardLarge.href = '../signup/signup.html';
    whiteboardSmall.href = '../signup/signup.html';
  }
  
  function removeToken(){
    if (signup.textContent == 'Log Out' || signupSmall.textContent == 'Log Out'){
      localStorage.removeItem('idToken');
    }
  }
  
