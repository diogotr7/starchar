import { Fieldset } from '@mantine/core'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { DnaFacePart } from '../Chf/Dna'
import { useCharacterStore } from '../useCharacterStore'
import { DnaBlend } from './DnaBlend'

export function DnaPart({ label, part }: { label: string, part: DnaFacePart }) {
  const { blend, updateCharacter } = useCharacterStore(useShallow(state => ({
    blend: state.character.dna.blends[part],
    updateCharacter: state.updateCharacter,
  })))

  const updateBlend = useCallback((index: number, value: number) => {
    updateCharacter((d) => {
      d.dna.blends[part][index].value = value
    })
  }, [part, updateCharacter])

  const updateHeadId = useCallback((index: number, value: string | number) => {
    if (typeof value === 'string')
      value = Number.parseInt(value) ?? 0

    const id = value ?? 0
    // double check this
    // 44 = broken
    // 43 = valid but seems unobtainable regularly
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
