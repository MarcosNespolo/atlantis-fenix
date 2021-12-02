import Card from "../../../components/Cards/Card";
import SectionCard from "../../../components/Cards/SectionCard";


export default function Food() {

    return (
        <div className="flex justify-center w-full mt-12">
            <Card title="Alimentação" className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                <SectionCard
                    label="Dieta"
                    lines={3}
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="Tipo de ração"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Alimentações por dia"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
            </Card>
        </div>
    )
}