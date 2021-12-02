import type { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Card from '../components/Cards/Card'
import InputText from '../components/Inputs/InputText'
import { AuthContext } from '../app/auth/authContext';
import axios from 'axios';
import Router from 'next/router'

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function onSubmit() {
    Router.push('/fish/newFish')
  }

  return (
    <div className="flex flex-row h-full content-start py-48 px-24">
      <div className="grid grid-cols-3 mx-auto h-fit">
        <img
          className="flex rounded-md col-span-2 h-full self-center content-center"
          src="img_main.png"
        />
        <Card className="flex flex-col self-center content-center h-full gap-8">
          <div className="relative justify-center mt-16 mx-auto">
            <img
              className="block"
              src="logo.png"
            />
          </div>
          <div className="flex flex-col w-72 mx-auto text-sm">
            <form onSubmit={onSubmit}>
              <span className="block text-center font-normal mb-8">
                Entrar com
              </span>
              <span className="block font-normal">
                E-mail
              </span>
              <InputText text={email} action={setEmail} />
              <span className="block font-normal mt-2">
                Senha
              </span>
              <InputText text={senha} action={setSenha} />
              <PrimaryButton className='mt-2' label={'Entrar'} onClick={() => onSubmit()} noIcon/>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home
