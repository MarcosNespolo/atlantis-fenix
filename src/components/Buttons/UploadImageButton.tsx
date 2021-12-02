import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>
  loading: boolean
  id: number
}

export default function UploadImageButton(props: UploadButtonProps) {
  return (
    <div className='cursor-pointer'>
      <label
        className="cursor-pointer ml-1 bg-action-light text-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 hover:bg-action focus:outline-none"
        htmlFor={`img${props.id}`}>
        {props.loading ? 'Atualizando ...' : `Selecionar imagem`}
      </label>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
        type="file"
        id={`img${props.id}`}
        accept="image/*"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}
