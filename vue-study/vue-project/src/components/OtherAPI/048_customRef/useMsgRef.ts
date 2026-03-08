import {customRef} from 'vue';


const  useMsgRef=(initVal:string,delay:number)=>{
  let timer:number|null=null
  return customRef((track,trigger)=>{
    return {
      get(){
        track()
        return initVal;
      },
      set(value:string){
        if(timer){
          clearTimeout(timer)
        }
        timer=setTimeout(()=>{
           initVal=value;
            trigger()
             timer=null
        },delay)
      }
    }
  })
}

export default useMsgRef