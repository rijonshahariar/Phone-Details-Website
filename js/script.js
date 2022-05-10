const spinner = document.getElementById('spinner'); //spinner
const searchField = document.getElementById('search-field'); //search box
const phoneInfo = document.getElementById('phone-details');  //Phone Details
const errorMsg = document.getElementById('error'); //Error Message
const searchPhone = () => {
    spinner.style.display = "block";//loading spinner;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => allPhones(data.data.slice(0, 20)))
}

//phones data
const allPhones = (data) => {

    const phoneDiv = document.getElementById("phone-container");
    phoneDiv.textContent = "";

    //Error Handling
    if (data.length === 0) {
        errorMsg.style.display = "flex";
        spinner.style.display = "none";
        phoneInfo.style.display = 'none';
        document.getElementById('input').innerText = searchField.value;
        searchField.value = "";
    }
    data.forEach((phone) => {
        // console.log(phone);
        const singlePhone = document.createElement("div");
        phoneDiv.appendChild(singlePhone);

        //Append Phones In Website
        singlePhone.classList.add("single-phone", "bg-light", "col-12", "col-md-3");
        singlePhone.innerHTML = `
          <div class="p-4 shadow-md rounded">
          <img class="img-fluid mb-3 mx-auto" src="${phone.image}">
          <p class='fs-4'><strong>${phone.phone_name}</strong></p>
          <p><strong>Brand: </strong>${phone.brand}</p>
          <button class="btn btn-primary rounded-pill mt-3" onclick="phoneDetails('${phone.slug}')">Details</button>
          </div>
        
        `;
        spinner.style.display = "none";
        phoneInfo.style.display = 'none';
        errorMsg.style.display = "none";
    });


};

//Phone Details
const phoneDetails = phoneID => {
    const url2 = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url2)
        .then(res => res.json())
        .then(data => phoneData(data.data))
}
const phoneData = phone => {

    phoneInfo.style.display = 'block';
    phoneInfo.textContent = "";
    const div = document.createElement("div");
    phoneInfo.appendChild(div);
    window.scrollTo(0, 300);

    div.classList.add('info');
    div.innerHTML = `
    <div class='col-12 row align-items-center'>
        <div class="col-md-2 image-dtl">
          <img class="img-fluid mt-3 mb-3 w-100 mx-auto" src="${phone.image}">
          </div>
          <div class="col-md-4 mx-auto">
          <h1 class="fs-1 mt-3"><strong>${phone.name}</strong></h1>
          <p><strong>Brand: </strong>${phone.brand}</p>
          <p><strong>Release Date: </strong>${phone.releaseDate ? phone.releaseDate : 'Not Released'}</p> 
          <br>
          </div> 
          <div class="col-md-6">
          <h3 class="fs-4"><strong>Main Features</strong></h3>
          <p class="custom-design"><i class="fa fa-folder-open"></i><strong> Storage: </strong>${phone.mainFeatures.storage}</p>  
          <p class="custom-design"><i class="fa fa-mobile"></i><strong> Display: </strong>${phone.mainFeatures.displaySize}</p>  
          <p class="custom-design"><i class="fa fa-sitemap"></i><strong> Chipset: </strong>${phone.mainFeatures.chipSet}</p>  
          <p class="custom-design"><i class="fa fa-database"></i><strong> Memory: </strong>${phone.mainFeatures.memory}</p>  
          <p class="custom-design"><i class="fa fa-magic"></i><strong> Sensors: </strong>${phone.mainFeatures ? phone.mainFeatures.sensors : 'Not Found'}</p> 
          <h3 class="fs-4 mt-2"><strong>Others</strong></h3>
          <p class="custom-design"><i class="fa fa-wifi"></i><strong> WLAN: </strong>${phone.others ? phone.others.WLAN : "Not Found"}</p> 
          <p class="custom-design"><i class="fa fa-share-alt"></i><strong> Bluetooth: </strong>${phone.others ? phone.others.Bluetooth : "Not Found"}</p> 
          <p class="custom-design"><i class="fa fa-headphones"></i><strong> Radio: </strong>${phone.others ? phone.others.Radio : "Not Found"}</p> 
          <p class="custom-design"><i class="fa fa-bus"></i><strong> GPS: </strong>${phone.others ? phone.others.GPS : "Not Found"}</p> 
          <p class="custom-design"><i class="fa  fa-key"></i><strong> USB: </strong>${phone.others ? phone.others.USB : "Not Found"}</p> 
          </div>
         </div>
         </div>
        `;

}