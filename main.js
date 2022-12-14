const wrapper = document.querySelector('.wrapper'),
form = wrapper.querySelector('form'),
infoText = wrapper.querySelector('p'),
copyBtn = wrapper.querySelector('.copy'),
closeBtn = wrapper.querySelector('.close'),
fileInput = form.querySelector('input');

function fetchRequest(formData , file) {
    infoText.textContent = 'Scanning QR Code...'
    fetch('https://api.qrserver.com/v1/read-qr-code/', {
        method : "POST",
        body : formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.textContent = result ? 'Upload QR Code to Scan' : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector('textarea').textContent = result;
        form.querySelector('img').src = URL.createObjectURL(file)
        wrapper.classList.add('active')
    }).catch(() => {
        infoText.textContent = "Couldn't Scan QR Code"
    })
}

fileInput.addEventListener('change' , e => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file' , file)
    fetchRequest(formData , file)
})

copyBtn.addEventListener('click' , () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text)
})

closeBtn.addEventListener('click' , () => {
    wrapper.querySelector('form').reset()
    wrapper.classList.remove('active')
})

form.addEventListener('click' , () => fileInput.click())
