const div1=document.getElementById('div1');
/** ----------------  没有throttle ------------ */
// div1.addEventListener('drag',function(e){
// 	console.log(e.offsetX,e.offsetY)
// })


	let timer=null;
div1.addEventListener('drag',function(e){

	if(timer){
		return
	}
	timer=setTimeout(function(){
		console.log('this=>',this)
		console.log(e.offsetX,e.offsetY)
		timer=null
	},500)
})
