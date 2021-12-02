import Card from "../../../components/Cards/Card";
import SectionCard from "../../../components/Cards/SectionCard";


export default function Comment() {

    return (
        <div className="flex justify-center w-full mt-12">
            <Card title='Observação' className="grid grid-cols-2 gap-8 w-34rem max-w-2xl">
                <SectionCard
                    label="Observação"
                    lines={3}
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
            </Card>
        </div>
    )
}