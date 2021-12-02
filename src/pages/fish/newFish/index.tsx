import { useState } from "react";
import Card from "../../../components/Cards/Card";
import PanelTabs from "../../../components/Cards/PanelTabs";
import SectionCard from "../../../components/Cards/SectionCard";
import Start from "./start";
import { useNewFishContext } from '../../../contexts/NewFishContext'
import { NewFishSteps } from "../../../lib/constants";
import Behavior from "./behavior";
import Food from "./food";
import Size from "./size";
import Water from "./water";
import Comment from "./comment";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";


export default function NewFish() {

    const [tabs, setTabs] = useState([
        { id: 0, name: 'Identificação', href: '#', current: true },
        { id: 1, name: 'Comportamento', href: '#', current: false },
        { id: 2, name: 'Alimentação', href: '#', current: false },
        { id: 3, name: 'Espaço', href: '#', current: false },
        { id: 4, name: 'Água', href: '#', current: false },
        { id: 5, name: 'Observação', href: '#', current: false },
    ])

    const {
        currentTab,
        setCurrentTab,
        setErrorMsg,
    } = useNewFishContext();

    function renderTab() {
        switch (currentTab) {
            case NewFishSteps.Start:
                return <Start />;
            case NewFishSteps.Behavior:
                return <Behavior />;
            case NewFishSteps.Food:
                return <Food />;
            case NewFishSteps.Size:
                return <Size />;
            case NewFishSteps.Water:
                return <Water />;
            case NewFishSteps.Comments:
                return <Comment />;
            default:
                return <></>;
        }
    }

    function next() {
        currentTab < NewFishSteps.Comments && setCurrentTab(currentTab + 1)
    }

    return (
        <div className="mb-12 z-10">
        <div className="flex content-center bg-white h-full w-80 md:w-full shadow-md mx-auto">
            <div className="lg:mx-auto">
                <PanelTabs tabs={tabs} setTabs={setTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} setErrorMsg={setErrorMsg} />
            </div>
        </div>
            {renderTab()}

            <div className="flex justify-center w-full -mt-2">
                <PrimaryButton
                    // onMouseEnter={() => setEnabledAlertMsg(true)}
                    onClick={() => next()}
                    //  loading={isLoading}
                    //   disabled={!validateCallAPI()}
                    className="w-34rem"
                    label={` ${currentTab < NewFishSteps.Comments ? 'Continuar' : 'Finalizar'}`}
                    roundedB
                    noIcon
                />
            </div>
        </div>
    )
}