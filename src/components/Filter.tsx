import styled from '@emotion/styled'
import { useState } from 'react'
import { FontVariant, Color, Radius } from '@/app/theme'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'

const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

const SelectName = styled.span<{ filtered: boolean }>`
  margin-left: 4px;
  ${FontVariant.body_sm}
  margin-right: 6px;
  color: ${props => (props.filtered ? Color.blue900 : Color.gray700)};
  white-space: nowrap;
`

const SelectBody = styled.div`
  position: relative;
  ${FontVariant.body_md}
  box-sizing: border-box;
`

const Value = styled.button<{ filtered: boolean }>`
  display: flex;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${props => (props.filtered ? Color.blue900 : Color.gray300)};
  border-radius: ${Radius.md};
  padding: 6px 16px 6px 12px;
  cursor: pointer;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  color: ${props => (props.filtered ? Color.blue900 : Color.gray700)};
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${Color.white};
  font: inherit;

  &:hover {
    color: ${props => (props.filtered ? Color.blue900 : Color.black)};
  }
`

const OptList = styled.ul`
  position: absolute;
  z-index: 2;
  list-style: none;
  margin-top: 12px;
  padding: 0;
  box-sizing: border-box;
  min-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${Color.gray200};
  border-radius: ${Radius.md};
  background-color: ${Color.white};

  .hidden {
    max-height: 0;
    visibility: hidden;
  }
`

const FilterOption = styled.li`
  display: block;
`

const FilterOptionButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  padding: 6px 12px;
  cursor: pointer;
  text-transform: capitalize;
  background: none;
  border: none;
  color: ${props => (props.selected ? Color.blue900 : 'inherit')};
  font: inherit;

  &:hover,
  &:focus-visible {
    background-color: ${Color.gray100};
  }
`

const OptionCheckbox = styled.input`
  margin: 0;
  cursor: pointer;
`

interface Props {
  filterName: string
  optionSet: string[]
  optionsSelected: string[]
  handleOptionsChange: (options: string[]) => void
}

const isFiltered = (optionsSelected: string[]) => optionsSelected.length > 0

export const Filter = ({ filterName, optionSet, optionsSelected, handleOptionsChange }: Props) => {
  const [optionOpen, setOptionOpen] = useState(false)
  const toggleList = () => setOptionOpen(prev => !prev)

  // Close the list only when focus leaves the whole select (trigger + option list),
  // so Tab-ing from the trigger into an option no longer closes the list before it can be reached.
  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOptionOpen(false)
    }
  }

  const toggleOption = (option: string) => {
    if (option === 'All') {
      handleOptionsChange([])
      return
    }
    handleOptionsChange(
      optionsSelected.includes(option) ? optionsSelected.filter(o => o !== option) : [...optionsSelected, option]
    )
  }

  const displayValue = isFiltered(optionsSelected) ? optionsSelected.join(', ') : 'All'

  return (
    <Select>
      <SelectName filtered={isFiltered(optionsSelected)}>{filterName}</SelectName>
      <SelectBody onBlur={handleContainerBlur}>
        <Value
          type="button"
          filtered={isFiltered(optionsSelected)}
          onClick={toggleList}
          aria-haspopup="listbox"
          aria-expanded={optionOpen}
        >
          {displayValue}
          {optionOpen ? (
            <IoChevronUpOutline size={20} color={`${isFiltered(optionsSelected) ? Color.blue900 : Color.gray700}`} />
          ) : (
            <IoChevronDownOutline size={20} color={`${isFiltered(optionsSelected) ? Color.blue900 : Color.gray700}`} />
          )}
        </Value>
        {optionOpen && (
          <OptList role="listbox">
            {optionSet.map(topic => {
              const selected = topic === 'All' ? !isFiltered(optionsSelected) : optionsSelected.includes(topic)
              return (
                <FilterOption key={topic} role="option" aria-selected={selected}>
                  <FilterOptionButton type="button" selected={selected} onClick={() => toggleOption(topic)}>
                    <OptionCheckbox type="checkbox" checked={selected} readOnly tabIndex={-1} />
                    {topic}
                  </FilterOptionButton>
                </FilterOption>
              )
            })}
          </OptList>
        )}
      </SelectBody>
    </Select>
  )
}
