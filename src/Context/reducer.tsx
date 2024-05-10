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

  if (action.type === 'setCharacter')
    return action.payload

  if (action.type === 'setSkinColor') {
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
  }

  if (action.type === 'setHeadColor') {
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
  }

  if (action.type === 'setLimbColor') {
    return {
      ...state,
      bodyMaterial: {
        ...state.bodyMaterial,
        limbColor: action.payload,
      },
    }
  }

  if (action.type === 'setTorsoColor') {
    return {
      ...state,
      bodyMaterial: {
        ...state.bodyMaterial,
        torsoColor: action.payload,
      },
    }
  }
  throw new Error('Invalid action')
}
