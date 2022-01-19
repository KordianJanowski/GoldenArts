import React from 'react'
import { Link } from 'react-router-dom'
import { jwt, user, links } from '../models/const-variables';
import { Ilink } from '../models/models';

const Navbar: React.FC = () =>{
  const linksMap = links.map((link:Ilink) => {
    return (
      <>
        { jwt || !link.jwt ?
          <Link key={link.url} to={`/${link.url}`} className='flex flex-row items-center justify-center xl:justify-start button-animation'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            <span className='hidden xl:block ml-2 font-light '>{link.name}</span>
          </Link>
        : null}
      </>
    )
  })

  return(
    <nav className='w-2/12 flex justify-center xl:justify-end'>
      <div className='h-screen w-2/12 2xl:w-60 fixed flex flex-col items-center justify-between py-5'>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full flex justify-center xl:justify-start'>
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 h-12 w-12 xl:h-20 xl:w-20 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
          </div>
          <div className='-ml-2 w-full grid grid-rows-1 gap-4 text-xl mt-2 mb-6 xl:mb-8'>
            { linksMap }
          </div>
          <Link to="/create-article" className='w-8 xl:w-full h-12 flex flex-row justify-center items-center bg-red-500 text-lg py-2 xl:py-4 px-6 xl:px-8 rounded-3xl button-animation'>
            <span className='hidden xl:block'>Dodaj artykuł</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 block xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </Link>
        </div>
        { jwt ?
          <Link
            to="/dashboard"
            className='w-10 xl:w-full h-12 flex flex-row justify-start items-center hover:bg-second text-lg py-2 xl:py-4 rounded-3xl button-animation'
          >
            <img
              className='w-10 h-10 rounded-full xl:mr-3 inline'
              src={user?.avatar}
              alt=""
            />
            <span className={`hidden xl:inline ${user?.username.length > 15 ? 'text-xs' : 'text-base'}`}>{ user?.username }</span>
          </Link>
        :
          <Link
            to="/login"
            className='w-12 xl:w-full h-12 flex flex-row justify-center items-center bg-second text-lg xl:py-4 xl:px-8 rounded-3xl button-animation border border-gray-600'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="button-animation w-6 h-6 block xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className='hidden xl:block'>Zaloguj się</span>
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;