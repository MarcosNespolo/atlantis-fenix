import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  MenuAlt2Icon,
  FilterIcon,
  XIcon,
} from '@heroicons/react/outline'
import { RiPencilRuler2Line, RiLeafLine } from 'react-icons/ri';
import { GiAquarium } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5'
import Image from 'next/image'
import icon from '../../public/favicon-white.svg'
import Link from 'next/link';

const sidebarNavigation = [
  { name: 'Aquário', href: '#', icon: GiAquarium, current: false },
  { name: 'Equipamentos', href: '#', icon: RiPencilRuler2Line, current: false },
  { name: 'Plantas', href: '/listPlants', icon: RiLeafLine, current: false },
  { name: 'Peixes', href: '/listFishes', icon: IoFishOutline, current: true },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function MainMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openAqua, setOpenAqua] = useState(false)

  return (
    <div className="w-full fixed">
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" static className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <Image width="40px" height="40px" src={icon} alt="Atlantis" />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={`${item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'} group py-2 px-3 rounded-md flex items-center text-sm font-medium`}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={`${item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white'} mr-3 h-6 w-6`}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex-shrink-0 h-16 bg-primary-dark shadow-lg flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
              onClick={() => { setOpenFilter(false); setOpenAqua(false); setMobileMenuOpen(true); }}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6">
              <Link href='/'>
                <div className="flex-1 flex items-center gap-2">
                  <Image height="30px" width="30px" src={icon} alt="Atlantis" />
                  <span className='text-2xl text-white ml-1 font-light'>Atlantis</span>
                </div>
              </Link>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                <button
                  type="button"
                  className="flex p-2 rounded items-center justify-center text-white bg-action bg-opacity-0 hover:bg-opacity-50 hover:shadow-sm"
                  onClick={() => {
                    if (openFilter) {
                      setOpenFilter(false);
                    }
                    setOpenAqua(!openAqua);
                  }}
                >

                  <GiAquarium className="h-4 w-4 mr-2" aria-hidden="true" /> Meu Aquário
                </button>
                <button
                  type="button"
                  className="flex p-2 rounded items-center justify-center text-white bg-action bg-opacity-0 hover:bg-opacity-50 hover:shadow-sm"
                  onClick={() => {
                    if (openAqua) {
                      setOpenAqua(false);
                    }
                    setOpenFilter(!openFilter);
                  }}
                >
                  <FilterIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Filtros
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}