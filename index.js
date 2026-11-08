/* https://www.thecolorapi.com/scheme?hex=CAA784&mode=monochrome&count=5*/

const colorsSection = document.getElementById('colors-section')
const pickerForm = document.getElementById('picker-form')
const seedColor = document.getElementById('seed-color')
const modeSelect = document.getElementById('mode-select')
const randomBtn = document.getElementById('random-btn')

document.addEventListener('click', function(e){
    if(e.target.dataset.hex){
        navigator.clipboard.writeText(e.target.dataset.hex)
    }
    
    const label = e.target.closest('.color-card').querySelector('.color-hex')
    label.textContent = 'Copied!'
    
    setTimeout(function(){
        label.textContent = e.target.dataset.hex
    }, 1000)
})

randomBtn.addEventListener('click', function(){
    seedColor.value = `#` + getRandomHex()
    getColorScheme()
})

function getRandomHex(){
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

pickerForm.addEventListener('submit', function(e){
    e.preventDefault()
    getColorScheme()
})


function getColorScheme(){
    const hex = seedColor.value.slice(1)
    const mode = modeSelect.value
    
    
fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(function(data){
        renderColors(data.colors)
    })
    
}

function renderColors(colors){
    const colorsHtml = colors.map(function(color){
        return `
            <div class="color-card">
                    <div class="color-swatch" data-hex="${color.hex.value}" style="background-color: ${color.hex.value}"></div>
                    <p class="color-hex" data-hex="${color.hex.value}">${color.hex.value}</p>
            </div>
        `
    }).join('')
    
    colorsSection.innerHTML = colorsHtml
}


getColorScheme()