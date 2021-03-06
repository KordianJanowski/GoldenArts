import React, { useState  } from 'react'
import { LOCALES } from '../i18n';
import { Iarticle } from '../models/models';

interface IProps {
  articles: Iarticle[]
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const ArticlesSorting: React.FC<IProps> = ({ articles, setArticles }) => {
  const [sortingValue, setSortingValue] = useState<string>('')
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const sortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(e.target.value)

    switch(e.target.value) {
      case 'date-newest':
        setArticles([...articles.sort((art1, art2) => +new Date(art2.createdAt) - +new Date(art1.createdAt))])
        break;
      case 'date-oldest':
        setArticles([...articles.sort((art1, art2) => +new Date(art1.createdAt) - +new Date(art2.createdAt))])
        break;
      }
  }

  return (

    <select
      value={sortingValue}
      onChange={sortingChange}
      className='text-gray-300 bg-main my-2 px-2 py-1 border border-gray-600 rounded-lg focus:border-red-400 focus:outline-none'
    >
      <option value="" disabled hidden>{isI18NisEnglish ? 'Sorting' : 'Sortowanie'}</option>
      <option value="date-newest">{isI18NisEnglish ? 'Date: latest' : 'Data: najnowsze'}</option>
      <option value="date-oldest">{isI18NisEnglish ? 'Date: oldest' : 'Data: najstarsze'}</option>
    </select>
  )
}

export default ArticlesSorting