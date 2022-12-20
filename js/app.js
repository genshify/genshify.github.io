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

   // * find player's char ids from fetched data 
   filterCharData = async (data) => {
      let playerData = await data
      let playerChars = playerData.avatarInfoList

      // storing all char ids of the  player
      let charIds = []
      playerChars.forEach(element => {
         charIds.push(element)
      });
      console.log(charIds);
      return charIds
   }

   // *display player chars
   displayData = (fetchedCharData) => {
      // clear window
      charDetailsDiv.innerHTML = ''
      let charCards = fetchedCharData.map(item => {
         let currentCharId = item.avatarId
         let fightProp = item.fightPropMap
         return `<div class="charDiv">
         <div class="charDivRow1">
            <img class="charIcon" src="https://enka.network/ui/${charJson[0][currentCharId].IconName}.png">
            <div class="charStatsInfo">
               <div class="charStatsInfoCol1">
                  <p>HP : ${ Math.floor(fightProp[2000])}</p>
                  <p>ATK : ${ Math.floor(fightProp[2001])}</p>
                  <p>def : ${ Math.floor(fightProp[2002])}</p>
                  <p>Em : ${ Math.floor(fightProp[28])}</p>
               </div>
               <div class="charStatsInfoCol2">
                  <p>Cr Rate : ${ Math.floor(fightProp[20] * 100)}</p>
                  <p>Cr Dmg : ${ Math.floor(fightProp[22] * 100)}</p>
                  <p>Er : ${ Math.floor(fightProp[23] * 100)}</p>
                  <p>Elmt bns: ${ Math.floor(fightProp[2000])}</p>
               </div>
            </div>
         </div>
         <div class="charDivRow2">
            <p class="talentP" ><img class="talentImg" src="https://enka.network/ui/Skill_A_03.png" alt="">10</p>
            <p class="talentP"><img class="talentImg" src="https://enka.network/ui/Skill_S_Hutao_01.png" alt="">10</p>
            <p class="talentP"><img class="talentImg" src="https://enka.network/ui/Skill_E_Hutao_01.png" alt="">9</p>
         </div>
         <div class="charDivRow3">
            <p>Avrg Dmg : 60000</p>
         </div>
      </div>`
         console.log(charJson[0][currentCharId]);
         // charJson[0][currentCharId].IconName
         // Math.floor(fightProp[2000])
      })
      charCards = charCards.join('')
      charDetailsDiv.innerHTML = charCards
   }

}

uidBtn.addEventListener('click', async () => {
   let uid = uidInput.value

   // making a object
   // myUid = 840889067
   // Hu-Tao = 10000046
   const player = new DmgCalc(uid)

   let fetchedData = await player.getData()
   let fetchedCharData = await player.filterCharData(fetchedData)
   player.displayData(fetchedCharData)
})
