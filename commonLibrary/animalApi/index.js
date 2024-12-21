import axios from 'axios';

const getCat = () => {
  //发送请求
  return axios.get('https://aws.random.cat/meow.json').then((response) => {
    const imageSrc = response.data.file;
    const text = 'CAT'
    return { imageSrc, text }
  }).catch(() => {
    const imageSrc = 'https://www.cat';
    const text = 'CAT'
    return { imageSrc, text }
  });

}

const getDog = () => {
  return axios.get('https://random.dog/woofc').then((response) => {

    const imageSrc = response.data.url
    const text = ' DOG'
    return { imageSrc, text }

  }).catch((err) => {
    const imageSrc = 'https://www.dog';
    const text = 'DoG'
    console.log("err", err)
    return { imageSrc, text }
  })
}


const getGoat = () => {
  const imageSrc = 'http://placegoat.com/200'
  const text = 'GOAT'
  return Promise.resolve({ imageSrc, text })
}

export default { getDog, getCat, getGoat }