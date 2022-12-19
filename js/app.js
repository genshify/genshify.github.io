// character json file
import charJson from './json/chars.json'assert {
   type: 'json'
}

// selectors
const links = document.querySelector(".links")
const showLinks = document.querySelector(".show-links")
const navToggle = document.querySelector(".nav-toggle")

const charDetailsDiv = document.querySelector('#charDetailsDiv')
const uidInput = document.querySelector('#uidInput')
const uidBtn = document.querySelector('#uidBtn')

navToggle.addEventListener("click", () => {
   console.log(links.classList)
   if (links.classList.contains("show-links")) {
      links.classList.remove("show-links")
      navToggle.style.transform = 'rotate(180deg)';
   } else {
      links.classList.add("show-links")
      navToggle.style.transform = 'rotate(90deg)';
   }
})


// ? Damage calculator

let onceDisplayed = false

class DmgCalc {

   constructor(uid) {
      this.uid = uid
   }

   // * get data by player id
   getData = async () => {
      let data = await fetch(`https://enka.network/u/${this.uid}/__data.json`)
      let json = await data.json()
      console.log(json);
      this.playerData = json
      return await json
   }

   // * find players chars in charJson 
   getCharData = async (data) => {
      let playerData = await data
      let playerChars = playerData.avatarInfoList
      let charIds = []
      playerChars.forEach(element => {
         charIds.push(element.avatarId)
      });
      return charIds
   }

   // *find players chars from charJson
   findChars = (characterIds) => {
      let data = []
      characterIds.forEach(id => {
         data.push(charJson[0][id])
      });
      return data
   }

   // *display player chars
   displayData = (charDetails) => {
      // clear window
      charDetailsDiv.innerHTML = ''
      charDetails.forEach(char => {
         let img_name = char.IconName
         let url = `https://enka.network/ui/${img_name}.png`

         // ? making a Div to store char details
         let charDiv = document.createElement('div')
         charDiv.setAttribute('class', 'charDiv')
         charDetailsDiv.appendChild(charDiv)

         // ? making a img tag to store image in charDiv
         let imgEl = document.createElement('img')
         imgEl.setAttribute('class', 'charIcon')
         imgEl.src = url
         charDiv.appendChild(imgEl)
      });

   }

}

uidBtn.addEventListener('click', async () => {
   let uid = uidInput.value

   // making a object
   // myUid = 840889067
   // Hu-Tao = 10000046
   const player = new DmgCalc(uid)

   let data = await player.getData()
   let characterIds = await player.getCharData(data)
   let charDetails = player.findChars(characterIds)
   player.displayData(charDetails)
})
