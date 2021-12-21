import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { Link } from 'react-router-dom'
import { Ihashtag } from '../models/models';
import Cookies from 'universal-cookie';
import { Iuser, Iarticle } from '../models/models';
import ArticleSearching from './ArticlesSearching';
import ArticlesSorting from '../components/ArticlesSorting';

type Props = {
  articles: Iarticle[];
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const Sidemenu: React.FC<Props> = ({ articles, setArticles }) =>{
  const [hashtags, setHashtags] = useState<Ihashtag[]>([{name: '', counter: 0}])

  useEffect(() => {
    const fetchHashtags = async() => {
      axios.get(`${API_URL}/hashtags`).then(res => {
        const hashtagsCopy:Ihashtag[] = res.data
        setHashtags(hashtagsCopy.sort((a, b) => b.counter - a.counter ))
      })
    }
    fetchHashtags()
  }, []);

  const[isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const[isSideMenuAnimateUsed, setIsSideMenuAnimateUsed] = useState<boolean | null>(null);

  const openSidemenu = () =>{
    if(isSideMenuOpen === true){
      setIsSideMenuAnimateUsed(false);
      setTimeout(() =>{
        setIsSideMenuOpen(false);
      }, 500)
    } else{
      setIsSideMenuAnimateUsed(true);
      setIsSideMenuOpen(true);
    }
  }
  // mapping only 3 first elements of array
  const hashtagsMap = hashtags.slice(0, 3).map(hash => {
    return(
      <li>
        <Link className='hover:underline' to={`/hashtags/${hash.name}`}>#{hash.name}</Link>
      </li>
    )
  })

  return(
    <>
      <nav className='xl:w-80 hidden xl:block'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div>
            <ArticleSearching articles={articles} setArticles={setArticles} openSidemenu={openSidemenu}/>
            <ArticlesSorting articles={articles} setArticles={setArticles} />
            <div className='mt-5 border-2 border-gray-600 rounded-xl p-3 bg-second'>
              <h2 className='text-lg font-semibold'>Ostatnie hashtagi</h2>
              <ul className='m-1 text-red-400'>
                <li>#Elektronika</li>
                <li>#Szymool</li>
                <li>#DealIt</li>
              </ul>
            </div>
            <div className='mt-5 border-2 border-gray-600 rounded-2xl p-3 bg-second'>
              <h2 className='text-lg font-semibold'>Popularne hashtagi</h2>
              <ul className='m-1 text-red-400'>
                {
                  hashtags.length > 0 ?
                    hashtagsMap
                  :
                    <span className='text-gray-500'>Brak hashtagów do wyświetlenia</span>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className='w-1/12 xl:w-60 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full md:ml-1 -mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg"
              onClick={openSidemenu}
              className="h-10 w-10 text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </nav>
      { isSideMenuOpen ?
        <nav className='block xl:hidden'>
          <div className={`h-screen w-screen fixed top-0 left-0  bg-main ${ isSideMenuAnimateUsed ? 'side-menu' : 'side-menu1' }`}>
            <div className='mt-20 px-4'>
              <div className=' w-full md:ml-1 -mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  onClick={openSidemenu}
                  className="h-10 w-10 text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </div>
              <div className='mt-4'>
                <ArticleSearching articles={articles} setArticles={setArticles} openSidemenu={openSidemenu} />
                <ArticlesSorting articles={articles} setArticles={setArticles} />
                <div className='mt-5 border-2 border-gray-600 rounded-xl p-3 bg-second'>
                  <h2 className='text-lg font-semibold'>Ostatnie hashtagi</h2>
                  <ul className='m-1 text-red-400'>
                    <li>#Elektronika</li>
                    <li>#Szymool</li>
                    <li>#DealIt</li>
                  </ul>
                </div>
                <div className='mt-5 border-2 border-gray-600 rounded-2xl p-3 bg-second'>
                  <h2 className='text-lg font-semibold'>Popularne hashtagi</h2>
                  <ul className='m-1 text-red-400'>
                    {
                      hashtags.length > 0 ?
                        hashtagsMap
                      :
                        <span className='text-gray-500'>Brak hashtagów do wyświetlenia</span>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      : null}

    </>
  )
}

export default Sidemenu;