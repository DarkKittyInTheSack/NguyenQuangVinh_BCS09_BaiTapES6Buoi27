import {Clothing} from "./../models/Clothing.js"

let arrChooseItem = []

const addToLocalStorage = (key,data) =>{
    localStorage.setItem(key, JSON.stringify(data))
}

const getDataFromLocalStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}

const getDataClothFromJSON = (arrClothes =[]) =>{
    axios.get('../data/Data.json','json')
    .then((result) => {
        result.data.tabPanes.forEach(element => {
            arrClothes.push(element)
        });
        addToLocalStorage('clothes',arrClothes)
    }).catch((err) => {
        console.log(err)
    });
}
getDataClothFromJSON()

const showResult = () =>{
    arrChooseItem.forEach((item) =>{
        switch(item.type){
            case "topclothes":
                document.querySelector('.bikinitop').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;
            
            case "botclothes":
                document.querySelector('.bikinibottom').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                    
                break;

            case "shoes":
                document.querySelector('.feet').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;
            
            case "handbags":
                document.querySelector('.handbag').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;

            case "necklaces":
                document.querySelector('.necklace').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 20;" alt="">`
                    
                break;
            
            case "hairstyle":
                document.querySelector('.hairstyle').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative d-block" style="z-index: 10; margin-left: 50px; margin-top: 13px" alt="">`
                        
                break;

            case "background":
                document.querySelector('.background').style.backgroundImage = `url('${item.imgSrc_png}')`
                        
                break;
        }
    })
}


const addItemToModel = (id,type) =>{
    arrChooseItem.forEach((item,index) =>{
        if(item.type == type){
            arrChooseItem.splice(index,1)
        }
    })
    let arrGet = getDataFromLocalStorage('clothes').find((item,index) => item.id == id)

    arrChooseItem.push(arrGet)
    console.log(arrChooseItem)
    showResult()
}

const getClothesByType = (key) =>{
    let content = ''
    getDataFromLocalStorage('clothes').filter((item,index) => item.type == key)
    .forEach((item) =>{
        let clothes = new Clothing()
        Object.assign(clothes,item)
        content += `<div class="col-lg-3 mt-3">
        <a type = "button" onclick = "addItemToModel('${clothes.id}', '${clothes.type}')" class="d-block w-100">
            <img src="${clothes.imgSrc_jpg}" alt="#" class="img-fluid w-100">
        </a>
        <a type = "button" onclick = "addItemToModel('${clothes.id}', '${clothes.type}')" class="d-block w-100">
            <h5 class="text-center mt-3">${clothes.name}</h5>
        </a>
        
      </div>`

      document.querySelector('.tab-content').innerHTML = content
    })
}

window.getClothesByType = getClothesByType
window.addItemToModel = addItemToModel

const getDataPillFromJSON = () =>{
    axios.get('../data/Data.json','json')
    .then((result) => {
        let content =''
        result.data.navPills.forEach(element => {
            content += `<li class="mx-2 my-1 bg-primary text-white px-2 py-1"><a type = "button" onclick = "getClothesByType('${element.type}')" style ="text-decoration: none; color:#fff;">${element.showName}</a></li>`
        document.querySelector('.nav-pills').innerHTML = content
        });
    }).catch((err) => {
        console.log(err)
    });
}

getDataPillFromJSON()



