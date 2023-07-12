let dataObj = [];
let contentContEl = document.querySelector('.contentcont');
let inpEl = document.querySelector('input');
let btnState = { city: false, state: false, center: false }
let btnArr = document.querySelectorAll('button')

async function apiCall() {
    let res = await axios.get('https://isro.vercel.app/api/centres');
    // console.log(res.data.centres);
    dataObj = res.data.centres;
}
apiCall().then(() => {
    render();
});

function render(data = dataObj) {
    data.forEach(obj => {
        let contentEl = document.createElement('div');
        contentEl.innerHTML =
            `<div class="content">
            <div class="contentdiv">
              <div>
                <h2>CENTER</h2>
                <h2>${obj.name}</h2>
              </div>
              <div>
                <h2>CITY</h2>
                <h2>${obj.Place}</h2>
              </div>
              <div>
                <h2>STATE</h2>
                <h2>${obj.State}</h2>
              </div>
            </div>
          </div>`
        contentContEl.appendChild(contentEl);
    })
}
// console.log(btnArr);
btnArr.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // console.log(e.target.className)
        btnArr.forEach(btn => {
            btn.classList.remove('selected');
        })
        for (let key in btnState) {
            if (btnState[e.target.className]) {
                btnState[e.target.className] = false;
                render();
                inpEl.value = '';
                return;
            }
            btnState[key] = false;
        }
        for (let key in btnState) {
            // console.log(key, e.target.className)
            if (key == e.target.className) {
                console.log('inif');
                btnState[key] = true;
                break;
            }
        }
        btn.classList.add('selected');
        search();
    })
})

function cityObj() {
    let dataArr = dataObj.filter((obj) => {
        return obj.Place.toLowerCase().includes(inpEl.value.toLowerCase());
    })
    return dataArr
}

function stateObj() {
    let dataArr = dataObj.filter((obj) => {
        return obj.State.toLowerCase().includes(inpEl.value.toLowerCase());
    })
    return dataArr
}

function centerObj() {
    let dataArr = dataObj.filter((obj) => {
        return obj.name.toLowerCase().includes(inpEl.value.toLowerCase());
    })
    return dataArr
}

inpEl.addEventListener("keyup", (e) => {
    // console.log(btnState)
    search();
})

function search() {
    if (!btnState.city && !btnState.state && !btnState.center) return;
    contentContEl.innerHTML = '';
    if (btnState.city) render(cityObj(dataObj));
    if (btnState.state) render(stateObj(dataObj));
    if (btnState.center) render(centerObj(dataObj));
}


