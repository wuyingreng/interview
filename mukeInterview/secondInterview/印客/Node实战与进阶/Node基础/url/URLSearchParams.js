const searchParams=new URLSearchParams('?query=string&shouldDelete=true#hash');

for(let [key,val] of searchParams){
	console.log('key==>',key,'val==>',val)
}

console.log('searchParams==>',searchParams.toString())