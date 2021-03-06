import Cookies from 'universal-cookie';
import { Iuser, Ilink } from './models';
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
const cookies: Cookies = new Cookies();


export const user: Iuser = cookies.get('user');
export const jwt: string | boolean = cookies.get('jwt') ? cookies.get('jwt') : false;
export const authorization: object = { headers: { Authorization: `Bearer ${jwt}` } };
export const authorization_user_id: object = jwt ? { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } } : {}
export const links: Ilink[] = [
  {
    name: "homepage",
    jwt: false,
    url: '',
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  },
  {
    name: "liked",
    jwt: true,
    url: 'liked',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    name: "followed",
    jwt: true,
    url: 'followeds',
    icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
  },
]

export const changeTagsType = async (tagsAsString: string) => {
  // removing all whitespaces from tagsAsString, and changes it to an array
  let tagsArr:string[] = tagsAsString.replaceAll(/\s/g,'').split(',')

  // filtering array of empty hashtags
  tagsArr = tagsArr.filter(function(str) {
    return /\S/.test(str);
  });

  return tagsArr
}

export const postImage = async (image:any) => {
  if(image !== '') {
    const imageResized: any = await resizeFile(image)

    const data = new FormData()
    data.append('file', imageResized)
    data.append("api_key", '732376169492789');
    data.append("api_secret", 'A-dhHrnEZqJYnhAGqLAGcWSDI1M');
    data.append("cloud_name", 'digj3w8rk');
    data.append("upload_preset", "bb7forio");

    const res = await axios.post(`https://api.cloudinary.com/v1_1/digj3w8rk/image/upload`, data)
    return res.data.secure_url
  }
}

export const resizeFile = (file: Blob) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 600, 600, 'JPEG', 100, 0,
  (uri) => {
    resolve(uri);
  }, 'base64' );
});