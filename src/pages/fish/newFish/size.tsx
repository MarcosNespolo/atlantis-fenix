import Card from "../../../components/Cards/Card";
import SectionCard from "../../../components/Cards/SectionCard";


export default function Size() {

    return (
        <div className="flex justify-center w-full mt-12">
            <Card title='Espaço' className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                <SectionCard
                    label="Tamanho médio adulto (cm)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <div></div>
                <SectionCard
                    label="Largura mínima aquário (cm)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Altura mínima aquário (cm)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Volume 1º exemplar"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Volume por exemplar adicional"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
            </Card>
        </div>
    )
}