const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon= document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input "),
passIndicatoor = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters ={ //objects of number letter and symbol
    lowercase : "abcdefghijklmnopqrstuvwxyz",
    uppercase :"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"!@#$%^&*()~`,<.>/?;:'[{}]|\=+"
}


const generatePassword = () =>{
let staticPassword = "",
randomPassword = "",
excludeDuplicate = false,
passlength =  lengthSlider.value;


options.forEach(option =>{ //looping through each option's checkbox
    if(option.checked){ // if checkbox is checked
        if(option.id !== "exc-duplicate" && option.id !== "spaces"){
            //adding particular key value from character object to staticPassword
    
            staticPassword += characters[option.id];
            
        }
        else if (option.id === "spaces"){//if checkbox id is spaces
            staticPassword +=  '  ${staticPassword}  ';//adding space at the beginning & end of staticPassword
        }
        else{ // else pass true value to excludeDuplicate
excludeDuplicate = true;
        }
    }

});
for (let i = 0; i < passlength; i++) {
    //getting random chara cter from the static password
    let randomChar = staticPassword[Math.floor(Math.random()* staticPassword.length)];
    if (excludeDuplicate) { // if excludeDuplicate is true
        // if randomPassword doesn't contains the current random charcater or randomChar is equal
        // to space "" then add random character to randomPassword else decrement i by -1
        !randomPassword.includes(randomChar) || randomChar == " "? randomPassword +=randomChar : i-- ;
    } else { // else add random charcter to randomPassword
        randomPassword +=randomChar;
    }
}
passwordInput.value = randomPassword; //passing randomPassword to passwordInput value

}

const updatePassIndicator = () => {
    // if lengthslider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider 
    // value is less than 16 then pass "medium" as id else pass "strong"
   passIndicatoor.id = lengthSlider.value <= 8 ?"weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    // passing slider value as counter text 
    document.querySelector(".pass-length span").innerText=(lengthSlider.value);
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout (()=>{
        copyIcon.innerText = "content_copy"
    },1500)
}
copyIcon.addEventListener("click",copyPassword)
lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click",generatePassword);
