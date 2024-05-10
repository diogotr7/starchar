import type { Character } from '../Chf/Character'

export type SetCharacterAction = {
  type: 'setCharacter'
  payload: Character
} | {
  type: 'setSkinColor'
  payload: string
} | {
  type: 'setHeadColor'
  payload: string
} | {
  type: 'setLimbColor'
  payload: string
} | {
  type: 'setTorsoColor'
  payload: string
}

export function reducer(state: Character, action: SetCharacterAction) {
  console.log(state, action)

  switch (action.type) {
    case 'setCharacter':
      return action.payload
    case 'setSkinColor':
      return {
        ...state,
        bodyMaterial: {
          ...state.bodyMaterial,
          limbColor: action.payload,
          torsoColor: action.payload,
        },
        faceMaterial: {
          ...state.faceMaterial,
          faceColors: {
            ...state.faceMaterial.faceColors,
            headColor: action.payload,
          },
        },
      }
    case 'setHeadColor':
      return {
        ...state,
        faceMaterial: {
          ...state.faceMaterial,
          faceColors: {
            ...state.faceMaterial.faceColors,
            headColor: action.payload,
          },
        },
      }
    case 'setLimbColor':
      return {
        ...state,
        bodyMaterial: {
          ...state.bodyMaterial,
          limbColor: action.payload,
        },
      }
    case 'setTorsoColor':
      return {
        ...state,
        bodyMaterial: {
          ...state.bodyMaterial,
          torsoColor: action.payload,
        },
      }
    default:
      // compile-time exhaustiveness checking
      action satisfies never
  }
}
