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

const FilterOptionButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 6px 12px;
  cursor: pointer;
  text-transform: capitalize;
  background: none;
  border: none;
  color: inherit;
  font: inherit;

  &:hover,
  &:focus-visible {
    background-color: ${Color.gray100};
  }
`

interface Props {
  filterName: string
  optionSet: string[]
  optionSelected: string
  handleOptionChange: (topic: string) => void
}

const isOptionExist = (optionSelected: string) => optionSelected !== 'All'

export const Filter = ({ filterName, optionSet, optionSelected, handleOptionChange }: Props) => {
  const [optionOpen, setOptionOpen] = useState(false)
  const toggleList = () => setOptionOpen(prev => !prev)

  // Close the list only when focus leaves the whole select (trigger + option list),
  // so Tab-ing from the trigger into an option no longer closes the list before it can be reached.
  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOptionOpen(false)
    }
  }

  return (
    <Select>
      <SelectName filtered={isOptionExist(optionSelected)}>{filterName}</SelectName>
      <SelectBody onBlur={handleContainerBlur}>
        <Value
          type="button"
          filtered={isOptionExist(optionSelected)}
          onClick={toggleList}
          aria-haspopup="listbox"
          aria-expanded={optionOpen}
        >
          {optionSelected}
          {optionOpen ? (
            <IoChevronUpOutline
              size={20}
              color={`${isOptionExist(optionSelected) ? Color.blue900 : Color.gray700}`}
            />
          ) : (
            <IoChevronDownOutline
              size={20}
              color={`${isOptionExist(optionSelected) ? Color.blue900 : Color.gray700}`}
            />
          )}
        </Value>
        {optionOpen && (
          <OptList role="listbox">
            {optionSet.map(topic => (
              <FilterOption key={topic} role="option" aria-selected={topic === optionSelected}>
                <FilterOptionButton
                  type="button"
                  onClick={() => {
                    handleOptionChange(topic)
                    toggleList()
                  }}
                >
                  {topic}
                </FilterOptionButton>
              </FilterOption>
            ))}
          </OptList>
        )}
      </SelectBody>
    </Select>
  )
}
