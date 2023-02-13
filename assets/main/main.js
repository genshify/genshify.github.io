const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navMenu = document.getElementById('nav-menu')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// Remove menu on mobile

const navLinks = document.querySelectorAll('.nav__link')
// console.log(navLinks)
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
})

function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


const sections = document.querySelectorAll('section')

function scrollActive() {
   const scrollY = window.pageYOffset
   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
         sectionTop = current.offsetTop - 50,
         sectionId = current.getAttribute('id')

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         if (document.querySelector('.nav__menu  a[href*=' + sectionId + ']')) {
            document.querySelector('.nav__menu  a[href*=' + sectionId + ']').classList.add('active-link')
         }
      } else {
         if (document.querySelector('.nav__menu  a[href*=' + sectionId + ']')) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
         }
      }
   })
}
window.addEventListener('scroll', scrollActive)
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 100) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

// let data = await fetch(`https://enka.network/api/uid/618285856`)
// let json = await data.json()
// console.log(json);
// // let da = https://enka.network/api/uid/618285856
// // console.log(data);

// !------------------------------------------------------------

// calculator 

// character json file
import charJson from '../jsons/chars.json'assert {
    type: 'json'
 }
 import nameJson from '../jsons/loc.json'assert {
    type: 'json'
 }

// ? Damage calculator

const chars = document.querySelector('#chars')
const uidInput = document.querySelector('#uidInput')
const uidBtn = document.querySelector('#uidBtn')

class DmgCalc {

   constructor(uid) {
      this.uid = uid
   }

   // * get data by player id
   getData = async () => {
      let data = await fetch(`https://enka.network/api/uid/${this.uid}`)
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
         name : '',
         dmg : '',
         color : ''
      }
      let physicDmg = fightProp[30]
      if (charVision == "Ice") {
         charElement.name = 'Cryo'
         charElement.dmg = fightProp[46]
         charElement.color = '#0082b9'

      } else if (charVision == "Wind") {
         charElement.name = 'Animo'
         charElement.dmg = fightProp[44]
         charElement.color = '#039da0'

      } else if (charVision == "Electric") {
         charElement.name = 'Electro'
         charElement.dmg = fightProp[41]
         charElement.color = '#370761'

      } else if (charVision == "Fire") {
         charElement.name = 'Pyro'
         charElement.dmg = fightProp[40]
         charElement.color = '#7c1f0d'

      } else if (charVision == "Water") {
         charElement.name = 'Hydro'
         charElement.dmg = fightProp[42]
         charElement.color = '#1552c5'

      } else if (charVision == "Grass") {
         charElement.name = 'Dendro'
         charElement.dmg = fightProp[45]
         charElement.color = '#278a2d'

      } else if (charVision == "Rock") {
         charElement.name = 'Geo'
         charElement.dmg = fightProp[43]
         charElement.color = '#97830f'

      }

      // ?checking char is physical  or not
      if (physicDmg > charElement.dmg) {
         charElement.name = 'Physical'
         charElement.dmg = physicDmg
      }

      charElement.dmg = Math.floor(charElement.dmg * 100)

      return charElement

   }
   returnMaximumLvl = (ascendLvl) => {
      if(ascendLvl == undefined){
         return 20
      }else if(ascendLvl == 1){
         return 40
      }else if(ascendLvl == 2){
         return 50
      }else if(ascendLvl == 3){
         return 60
      }else if(ascendLvl == 4){
         return 70
      }else if(ascendLvl == 5){
         return 80
      }else if(ascendLvl == 6){
         return 90
      }
   }


   // *display player chars
   displayData = (fetchedCharData) => {
      // clear window
      chars.innerHTML = ''
      let charCards = fetchedCharData.map(item => {

         let id = item.avatarId
         let fightProp = item.fightPropMap
         let element = charJson[0][id].Element
         let elementDetails = this.returnElementDmg(element, fightProp)
         let nameId = charJson[0][id].NameTextMapHash
         let wepData = item.equipList[item.equipList.length - 1]
         let skillIds = Object.keys(item.skillLevelMap)
         let skillIconNames = []
         let contslIconNames = charJson[0][id].Consts
         let charMaxLvl = this.returnMaximumLvl(item.propMap[1002].val)
         let wepMaxLvl = this.returnMaximumLvl(wepData.weapon.promoteLevel)

         //? getting each skillId's icon names
         skillIds.forEach(SkillsId => {
            skillIconNames.push(charJson[0][id].Skills[SkillsId])
         });

         console.log();

         // console.log(nameJson);

         return `<div class="charDiv" style = "background-color : ${elementDetails.color}">
            <div class="charDivRow1">
               <div class="charCardCol1 charIconName cardDarkColor">
                  <img class="charIcon" src="https://enka.network/ui/${charJson[0][id].IconName}.png">
                  <p class="charName">${nameJson[0][nameId]}</p>
                  <p class="charLvl">${item.propMap[4001].val}/${charMaxLvl}</p>
               </div>
               <div class="charStatsInfo charCardCol2 cardDarkColor">
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
               <div class="charWeapon charCardCol1 cardDarkColor">
                  <p class="weaponP"><img class=" weaponImg"
                        src="https://enka.network/ui/${wepData.flat.icon}.png" alt="">${wepData.weapon.level}/${wepMaxLvl}</p>
                  <p class="weaponName">${nameJson[0][wepData.flat.nameTextMapHash]} </p>
               </div>
               <div class="charCardCol2 cardDarkColor">
                  <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconNames[0]}.png" alt="">
                  ${item.skillLevelMap[skillIds[0]]}</p>
                  <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconNames[1]}.png"
                        alt="">${item.skillLevelMap[skillIds[1]]}</p>
                  <p class="talentP"><img class="talentImg" src="https://enka.network/ui/${skillIconNames[2]}.png"
                        alt="">${item.skillLevelMap[skillIds[2]]}</p>
               </div>
            </div>
            <div class="charDivRow3">
               <div class="charConstl cardDarkColor">
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[0]}.png" alt="">
                  <i class=" constl1 lockIcon fas fa-lock"></i>
                  </div>
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[1]}.png" alt="">
                  <i class="constl2 lockIcon fas fa-lock"></i>
                  </div>
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[2]}.png" alt="">
                  <i class="constl3 lockIcon fas fa-lock"></i>
                  </div>
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[3]}.png" alt="">
                  <i class="constl4 lockIcon fas fa-lock"></i>
                  </div>
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[4]}.png" alt="">
                  <i class="constl5 lockIcon fas fa-lock"></i>
                  </div>
                  <div class="conslCircle" >
                  <img class="constlImg1" src="images/frames/constlFrame2.png" alt="">
                  <img class="constlImg2" src="https://enka.network/ui/${contslIconNames[5]}.png" alt="">
                  <i class="constl6 lockIcon fas fa-lock"></i>
                  </div>
               </div>
            </div>
            <div class="charDivRow4">
               <p>Avrg Dmg : 60000</p>
            </div>
         </div>`

         console.log(charJson[0][currentCharId]);
         // charJson[0][currentCharId].IconName
         // Math.floor(fightProp[2000])
         // lumine : 10000007
         // Aither : 10000005
      })
      charCards = charCards.join('')
      chars.innerHTML = charCards
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

// !------------------------------------------------------------
