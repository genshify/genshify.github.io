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
      // console.log(charIds);
      return charIds
   }

   // *return char's element dmg will return
   returnElementDmg = (charVision, fightProp) => {
      let charElement = {
         name: '',
         dmg: ''
      }
      let physicDmg = fightProp[30]
      if (charVision == "Ice") {
         charElement.name = 'Cryo'
         charElement.dmg = fightProp[46]

      } else if (charVision == "Wind") {
         charElement.name = 'Animo'
         charElement.dmg = fightProp[44]

      } else if (charVision == "Electric") {
         charElement.name = 'Electro'
         charElement.dmg = fightProp[41]

      } else if (charVision == "Fire") {
         charElement.name = 'Pyro'
         charElement.dmg = fightProp[40]

      } else if (charVision == "Water") {
         charElement.name = 'Hydro'
         charElement.dmg = fightProp[42]

      } else if (charVision == "Grass") {
         charElement.name = 'Dendro'
         charElement.dmg = fightProp[45]

      } else if (charVision == "Rock") {
         charElement.name = 'Geo'
         charElement.dmg = fightProp[43]

      }

      // ?checking char is physical  or not
      if (physicDmg > charElement.dmg) {
         charElement.name = 'Physical'
         charElement.dmg = physicDmg
      }

      charElement.dmg = Math.floor(charElement.dmg * 100)

      return charElement

   }


   // *display player chars
   displayData = (fetchedCharData) => {
      // clear window
      charDetailsDiv.innerHTML = ''
      let charCards = fetchedCharData.map(item => {
         let currentCharId = item.avatarId
         let fightProp = item.fightPropMap
         //? store current char's element
         let charElement = charJson[0][currentCharId].Element
         let elementDetails = this.returnElementDmg(charElement, fightProp)
         //? storing skill icon id's for each chars
         let skillsIds = Object.keys(item.skillLevelMap)
         //? storing skillIconNames
         let skillIconName = []

         //? getting each skillId's icon names
         skillsIds.forEach(SkillsId => {
            skillIconName.push(charJson[0][currentCharId].Skills[SkillsId])
         });

         console.log(item.skillLevelMap[skillsIds[1]]);
         return `<div class="charDiv">
         <div class="charDivRow1">
            <div class="charCardCol1 charIconName">
               <img class="charIcon" src="https://enka.network/ui/${charJson[0][currentCharId].IconName}.png">
               <p class="charName">Hu Tao</p>
               <p class="charLvl">90/90</p>
            </div>
            <div class="charStatsInfo charCardCol2">
               <div class="charStatsInfoCol1">
                  <p>HP : ${ Math.floor(fightProp[2000])}</p>
                  <p>ATK : ${ Math.floor(fightProp[2001])}</p>
                  <p>def : ${ Math.floor(fightProp[2002])}</p>
                  <p>Em : ${ Math.floor(fightProp[28])}</p>
               </div>
               <div class="charStatsInfoCol2">
                  <p>Cr Rate : ${ Math.floor(fightProp[20] * 100)}%</p>
                  <p>Cr Dmg : ${ Math.floor(fightProp[22] * 100)}%</p>
                  <p>Er : ${ Math.floor(fightProp[23] * 100)}%</p>
                  <p>${elementDetails.name}%: ${elementDetails.dmg}%</p>
               </div>
            </div>
         </div>
         <div class="charDivRow2">
            <div class="charWeapon charCardCol1">
               <p class="talentP weaponP"><img class="talentImg weaponImg"
                     src="https://enka.network/ui/UI_EquipIcon_Pole_Blackrock.png" alt="">90/90</p>
               <p class="weaponName">Blackcliff </p>
            </div>
            <div class="charCardCol2">
               <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconName[0]}.png" alt="">
               ${item.skillLevelMap[skillsIds[0]]}</p>
               <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconName[1]}.png"
                     alt="">${item.skillLevelMap[skillsIds[1]]}</p>
               <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconName[2]}.png"
                     alt="">${item.skillLevelMap[skillsIds[2]]}</p>
            </div>
         </div>
         <div class="charDivRow3">
            <div class="charConstl">
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_S_Hutao_03.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_S_Hutao_01.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_U_Hutao_01.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_S_Hutao_02.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_U_Hutao_02.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
               <div class="conslCircle" >
               <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
               <img class="constlImg2" src="https://enka.network/ui/UI_Talent_S_Hutao_04.png" alt="">
               <i class=" lockIcon fas fa-lock"></i>
               </div>
            </div>
         </div>
         <div class="charDivRow4">
            <p>Avrg Dmg : 60000</p>
         </div>
      </div>`


         //    `<div class="charDiv">
         //    <div class="charDivRow1">
         //       <img class="charIcon" src="https://enka.network/ui/${charJson[0][currentCharId].IconName}.png">
         //       <div class="charStatsInfo">
         //          <div class="charStatsInfoCol1">
         //             <p>HP : ${ Math.floor(fightProp[2000])}</p>
         //             <p>ATK : ${ Math.floor(fightProp[2001])}</p>
         //             <p>def : ${ Math.floor(fightProp[2002])}</p>
         //             <p>Em : ${ Math.floor(fightProp[28])}</p>
         //          </div>
         //          <div class="charStatsInfoCol2">
         //             <p>Cr Rate : ${ Math.floor(fightProp[20] * 100)}%</p>
         //             <p>Cr Dmg : ${ Math.floor(fightProp[22] * 100)}%</p>
         //             <p>Er : ${ Math.floor(fightProp[23] * 100)}%</p>
         //             <p>${elementDetails.name} %: ${elementDetails.dmg}%</p>
         //          </div>
         //       </div>
         //    </div>
         //    <div class="charDivRow2">
         //       <p class="talentP" >
         //          <img class="talentImg" src="https://enka.network/ui/${skillIconName[0]}.png" alt="">
         //       ${item.skillLevelMap[skillsIds[0]]}</p>
         //       <p class="talentP">
         //          <img class="talentImg" src="https://enka.network/ui/${skillIconName[1]}.png" alt="">
         //       ${item.skillLevelMap[skillsIds[1]]}</p>
         //       <p class="talentP">
         //          <img class="talentImg" src="https://enka.network/ui/${skillIconName[2]}.png" alt="">
         //       ${item.skillLevelMap[skillsIds[2]]}</p>
         //    </div>
         //    <div class="charDivRow3">
         //       <p>Avrg Dmg : 60000</p>
         //    </div>
         // </div>`
         console.log(charJson[0][currentCharId]);
         // charJson[0][currentCharId].IconName
         // Math.floor(fightProp[2000])
         // lumine : 10000007
         // Aither : 10000005
      })
      charCards = charCards.join('')
      charDetailsDiv.innerHTML = charCards
   }

}

uidBtn.addEventListener('click', async () => {
   let uid = uidInput.value

   // myUid = 840889067
   // Hu-Tao = 10000046
   // making a object
   const player = new DmgCalc(uid)

   let fetchedData = await player.getData()
   let fetchedCharData = await player.filterCharData(fetchedData)
   player.displayData(fetchedCharData)
})
