import Card from "../../../components/Cards/Card";
import SectionCard from "../../../components/Cards/SectionCard";
import Image from 'next/image'
import fishImage from '../../../../public/fish.jpg'
import { useState } from "react";
import UploadImageButton from "../../../components/Buttons/UploadImageButton";


export default function Start() {

    const [loadingLogo, setLoadingLogo] = useState<boolean>(false)
    async function uploadImage(event: any) {

    }

    return (
        <div className="flex justify-center w-full mt-12">
            <Card className="grid grid-cols-2 gap-6 w-full max-w-2xl" title='NOVA ESPÉCIE' subtitle='Identificação' noRounded>
                <div className="col-span-2 flex flex-col gap-4 mt-2 justify-center items-center">
                    <div className='w-40'>
                        <img
                            className="mx-auto max-h-36 max-w-full drop-shadow-md rounded"
                            src={'/fish.jpg'}
                            alt={'Peixe'}
                        />
                    </div>
                    <div className='h-7 -mt-2'>
                        <UploadImageButton id={0} onUpload={uploadImage} loading={loadingLogo} />
                    </div>
                </div>
                <SectionCard
                    label="Nome usual (Português)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Nome usual (Inglês)"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Nome científico"
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="Ordem"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Família"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Bioma"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Local de Origem"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
            </Card>
        </div>
    )
}