import {
  artifactMainstatData,
  artifactSubstatData,
  artifactSubstatRollCorrection,
  artifactSubstatRollData,
} from 'genshin-optimizer/dm'
import artifactData from './src/artifactData'
import type { CharacterDataGen } from './src/characterData'
import characterData from './src/characterData'
import characterSkillParam from './src/characterSkillParam'
import { charExpCurve, weaponExpCurve } from './src/curves'
import type { WeaponDataGen } from './src/weaponData'
import weaponData from './src/weaponData'

export type { CharacterDataGen, WeaponDataGen as WeaponData, WeaponDataGen }


const characterDataDump = characterData()
const characterSkillParamDump = characterSkillParam()
const weaponDataDump = weaponData()
const artifactDataDump = artifactData()

const allStat = {
  char: {
    expCurve: charExpCurve,
    skillParam: characterSkillParamDump,
    data: characterDataDump,
  },
  weapon: {
    expCurve: weaponExpCurve,
    data: weaponDataDump,
  },
  art: {
    data: artifactDataDump,
    subRoll: artifactSubstatRollData,
    subRollCorrection: artifactSubstatRollCorrection,
    main: artifactMainstatData,
    sub: artifactSubstatData,
  },
} as const

export type AllStats = typeof allStat



  // dumpFile(`${__dirname}/allChar_gen.json`, characterSkillParamDump)
  

