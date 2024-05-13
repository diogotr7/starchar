import { Fieldset } from '@mantine/core'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { DnaFacePart } from '../chf/Dna'
import { useCharacterStore } from '../useCharacterStore'
import { DnaBlend } from './DnaBlend'

export function DnaPart({ label, part }: { label: string, part: DnaFacePart }) {
  const { blend, updateCharacter } = useCharacterStore(useShallow(state => ({
    blend: state.character.dna.blends[part],
    updateCharacter: state.updateCharacter,
  })))

  const updateBlend = useCallback((index: number, value: number) => {
    // kind of ugly but it works well enough and i dont want to spend more time on it
    const diff = value - blend[index].value
    const otherIndices = [0, 1, 2, 3].filter(i => i !== index)
    const otherValues = otherIndices.map(i => blend[i].value)
    const otherTotal = otherValues.reduce((acc, v) => acc + v, 0)
    const otherNewTotal = otherTotal - diff
    const otherNewValues = otherValues.map(v => v / otherTotal * otherNewTotal)
    const newValues = [...otherNewValues]
    newValues.splice(index, 0, value)
    const newBlends = newValues.map((v, i) => ({ headId: blend[i].headId, value: v }))
    updateCharacter((d) => { d.dna.blends[part] = newBlends })
  }, [blend, part, updateCharacter])

  const updateHeadId = useCallback((index: number, value: string | number) => {
    const id = typeof value === 'number' ? value : Number.parseInt(value) ?? 0
    updateCharacter((d) => { d.dna.blends[part][index].headId = id })
  }, [part, updateCharacter])

  return (
    <Fieldset legend={label}>
      <DnaBlend
        headId={blend[0].headId}
        value={blend[0].value}
        onChangeNumber={v => updateHeadId(0, v)}
        onChangeSlider={v => updateBlend(0, v)}
      />
      <DnaBlend
        headId={blend[1].headId}
        value={blend[1].value}
        onChangeNumber={v => updateHeadId(1, v)}
        onChangeSlider={v => updateBlend(1, v)}
      />
      <DnaBlend
        headId={blend[2].headId}
        value={blend[2].value}
        onChangeNumber={v => updateHeadId(2, v)}
        onChangeSlider={v => updateBlend(2, v)}
      />
      <DnaBlend
        headId={blend[3].headId}
        value={blend[3].value}
        onChangeNumber={v => updateHeadId(3, v)}
        onChangeSlider={v => updateBlend(3, v)}
      />
    </Fieldset>
  )
}
