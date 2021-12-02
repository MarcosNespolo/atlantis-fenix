import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface NewFishContextType {
  currentTab: number
  setCurrentTab: (step: number) => void
  setErrorMsg: (errorMsg: string) => void
}

type NewFishContextProviderType = {
  children: ReactNode
}

export const NewFishContext = createContext({} as NewFishContextType)

export function NewFishContextProvider({ children }: NewFishContextProviderType) {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [errorMsgm, setErrorMsg] = useState<string>('')

  return (
    <NewFishContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        setErrorMsg
      }}>
      {children}
    </NewFishContext.Provider>
  )
}

export const useNewFishContext = () => {
  return useContext(NewFishContext);
}