export interface Iuser{
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  password?: string;
}

export interface IcookieArguments {
  time: string;
  path: string;
}

export interface Iarticle {
  title: string;
  body: IarticleBody;
  main_image: string;
  author_id: string;
  hashtags: string[];
  createdAt: string;
  published_at: string;
  updatedAt: string;
  id: string;
}

export interface IcreateArticle {
  title: string;
  body?: IarticleBody;
  main_image: string;
  author_id: string;
  hashtags: string[];
} 

export interface IarticleBody {
  blocks: string[];
  html: string;
}

export interface Icomment{
  body: string;
  author_id: string
  article_id: string;
  id?: string;
  createdAt?: string;
}

export interface Ifeedback{
  body: string;
  author_id: string;
  article_id: string;
  id?: string;
  createdAt?: string;
}

export interface Iliked{
  article_id: string;
  user_id: string;
  id?: string;
}

export interface Ifollowed{
  author_id: string;
  user_id: string;
  id?: string;
}

export interface Ilink {
  name: string;
  url: string;
  jwt: boolean;
  icon: string;
}

export interface InewHashtag {
  name: string;
}

export interface Ihashtag {
  name: string;
  counter: number;
}