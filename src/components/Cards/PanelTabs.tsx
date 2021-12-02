import { useEffect, useState } from 'react'
import { useNewFishContext } from '../../contexts/NewFishContext'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export type PanelStepsProps = {
  tabs: any[],
  currentTab: number,
  setTabs: (tabs: any) => void,
  setCurrentTab: (currentStep: number) => void,
  setErrorMsg: (errorMsg: string) => void
}

export default function PanelTabs({ setErrorMsg, setTabs, tabs, setCurrentTab, currentTab }: PanelStepsProps) {

  useEffect(() => {
    setErrorMsg('')
    setTabs(tabs.map((tab) =>
      tab.id == currentTab
        ? { ...tab, current: true }
        : { ...tab, current: false }
    ))
  }, [currentTab])

  return (
    <>
      {tabs ?
        <div>
          <div className="lg:hidden px-6 py-4 w-full">
            <select
              id="tabs"
              name="tabs"
              onChange={(e) => setCurrentTab(Number.parseInt(e.target.value))}
              className="block w-full focus:ring-primary focus:border-primary border-gray-300 rounded-md text-sm"
              defaultValue={tabs.find((tab) => tab.current) && tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.id}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex gap-5" aria-label="Tabs">
                {tabs.map((tab) => (
                  tab.current
                    ?
                    <a
                      key={tab.name}
                      onClick={() => setCurrentTab(tab.id)}
                      className={'border-primary text-primary group flex items-center w-fit p-4 px-5 text-center border-b-2 font-medium text-sm uppercase hover:cursor-pointer whitespace-nowrap cursor-pointer'}
                    >
                      <span className={'border border-primary text-primary mr-3 block flex justify-center items-center w-8 h-8 rounded-full'}>{tab.id + 1}</span>
                      {tab.name}
                    </a>
                    :
                    <a
                      key={tab.name}
                      onClick={() => setCurrentTab(tab.id)}
                      className={'border-transparent text-gray-500 hover:text-action-light hover:border-action-light group flex items-center w-fit p-4 text-center border-b-2 font-medium text-sm uppercase hover:cursor-pointer whitespace-nowrap cursor-pointer'}>
                      <span className={'text-gray-500 group-hover:text-action-light group-hover:border-action-light block flex justify-center items-center w-8 h-8 border border-gray-500 rounded-full'}>{tab.id + 1}</span>
                    </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        : <></>
      }
    </>
  )
}