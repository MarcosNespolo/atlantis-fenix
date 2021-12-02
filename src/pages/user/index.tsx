import { useState } from "react";
import UploadImageButton from "../../components/Buttons/UploadImageButton";
import Card from "../../components/Cards/Card";
import SectionCard from "../../components/Cards/SectionCard";
import PrimaryButton from "../../components/Buttons/PrimaryButton";


export default function NewFish() {
    const [loadingLogo, setLoadingLogo] = useState<boolean>(false)
    async function uploadImage(event: any) {
    }

    return (
        <div className="mb-12 z-10">
        <div className="flex justify-center w-full mt-12">
            <Card className="grid grid-cols-2 gap-6 w-34rem max-w-2xl" title='NOVO USUÁRIO' subtitle='Perfil' noRounded>
                <div className="col-span-2 flex flex-col gap-4 mt-2 justify-center items-center">
                    <div className='w-40'>
                        <img
                            className="mx-auto max-h-36 max-w-full drop-shadow-md rounded"
                            src={'/pessoa.jpg'}
                            alt={'Peixe'}
                        />
                    </div>
                    <div className='h-7 -mt-2'>
                        <UploadImageButton id={0} onUpload={uploadImage} loading={loadingLogo} />
                    </div>
                </div>
                <SectionCard
                    label="Nome"
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="Apelido"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="E-mail"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Link"
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
                <SectionCard
                    label="País"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Estado"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Cidade"
                    text={''}
                    type="input"
                    className=""
                    width='1'
                />
                <SectionCard
                    label="Descrição"
                    lines={3}
                    text={''}
                    type="input"
                    className=""
                    width='2'
                />
            </Card>
        </div>

            <div className="flex justify-center w-full -mt-2">
                <PrimaryButton
                    // onMouseEnter={() => setEnabledAlertMsg(true)}
                    onClick={() => {}}
                    //  loading={isLoading}
                    //   disabled={!validateCallAPI()}
                    className="w-34rem"
                    label={'Salvar'}
                    roundedB
                    noIcon
                />
            </div>
        </div>
    )
}