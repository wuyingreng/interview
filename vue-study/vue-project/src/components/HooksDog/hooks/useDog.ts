import {reactive} from 'vue'
import axios from 'axios';

export const useDog=()=>{
  const dogs=reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg']);

  const addDog=async()=>{
      try{
        const result=await axios.get('https://dog.ceo/api/breed/pembroke/images/random');
        console.log('result===>',result);
        dogs.push(result.data.message)
      }catch(err){
        alert(err)
      }
  }
  
  return {addDog,dogs}

}