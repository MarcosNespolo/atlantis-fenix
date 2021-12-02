import Card from "../../../components/Cards/Card";
import SectionCard from "../../../components/Cards/SectionCard";


export default function Water() {

    return (
        <div className="flex justify-center w-full mt-12">
            <Card title='Água' className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                <SectionCard
                    label="Cardume mínimo"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Posição no aquário"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Reprodução"
                    lines={3}
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="Dimorfismo Sexual"
                    lines={3}
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="Características (auto defesa)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Substratos indicados"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Temperamento própria espécie"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Temperamento outras espécies"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
            </Card>
        </div>
    )
}