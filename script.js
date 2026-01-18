const colorPickerBtn = document.querySelector("#color-picker"),
	  colorWheelTrigger = document.querySelector("#color-wheel-trigger"),
	  colorWheel = document.querySelector("#color-wheel"),
	  clearAll = document.querySelector(".clear-all"),
	  colorList = document.querySelector(".all-colors"),
      pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = (e) => {
    e.innerText = "Kopyalandı";
    navigator.clipboard.writeText(e.dataset.color);
    setTimeout(() => e.innerText = e.dataset.color, 1000);
};

const showColor = () => {
    if (!pickedColors.length) return; 
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `).join(""); 
    document.querySelector(".picked-colors").classList.remove("hide");
   
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
};

showColor();

const activeEyeDropper = () => {
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);

            if (!pickedColors.includes(sRGBHex)) {
                pickedColors.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
                showColor();
            }
        } catch (error) {
            alert("Renk Kodunu Kopyalayamadım!");
        }
    }, 10);
};

const handleColorWheel = () => {
    colorWheel.click(); 
};



const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
};

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activeEyeDropper);
colorWheelTrigger.addEventListener("click", handleColorWheel);