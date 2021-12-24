import React, { useEffect, useState } from 'react';
import axios from 'axios'
import API_URL from '../API_URL';
import { useParams } from 'react-router-dom';
import { Iarticle } from '../models/models'
import { authorization, user} from '../models/const-variables'
import AddComment from '../components/Article/Comments/AddComment';
import AddFeedback from '../components/Article/Feedbacks/AddFeedback';

interface Props {
  id: string;
}

const Article:React.FC = () =>{
  const id: string = useParams<Props>().id;

  const [article, setArticle] = useState<Iarticle>();
  const [isArticleExist, setIsArticleExist] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setIsArticleExist(true);
      })
      .catch(err => console.log(err))
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    if(isArticleExist) {
      let userRecentHashtags:string[] = []
  
      const fetchUserRecentHashtags = async () => {
        await axios.get(`${API_URL}/users/${user.id}`)
        .then(res => {
          userRecentHashtags = res.data.recent_hashtags
          updateUserRecentHashtags()
        })
        .catch(err => console.log(err))
      }
  
      const updateUserRecentHashtags = async () => {
        article?.hashtags.forEach((hashtag: string) => {
          if(!userRecentHashtags.includes(hashtag)) {
            userRecentHashtags.unshift(hashtag)
            if(userRecentHashtags.length > 50) {
              userRecentHashtags.pop()
            }
          } else {
            const index = userRecentHashtags.findIndex(el => el === hashtag)
            userRecentHashtags.splice(index, 1)
            userRecentHashtags.unshift(hashtag)
          }
        })
   
        await axios.put(`${API_URL}/users/${user.id}`, {recent_hashtags: userRecentHashtags}, authorization)
        .catch(err => console.log(err))
      }
  
      fetchUserRecentHashtags()
    }
  }, [isArticleExist])

  return(
    <div>
      { 
        isArticleExist ?
          <div>
            <h1>{ article?.title }</h1>
            <div dangerouslySetInnerHTML={{__html: article?.body.html!}}></div>
          </div> 
        :
          <div>article not found</div> 
      }

      <div >
        <h1 className="text-4xl">
          COMMENTS
        </h1>
        <AddComment id={id} />
      </div>
      <div >
        <h1 className="text-4xl">
          FEEDBACK
        </h1>
        <AddFeedback id={id} />
      </div>
    </div>
  )
}

export default Article;