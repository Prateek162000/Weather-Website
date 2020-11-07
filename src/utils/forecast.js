const request=require('request')


const forecast=(latitude,longitude,callback)=>{
	const url='http://api.weatherstack.com/current?access_key=2b078f376552961bb563d6fb8eb36ce2&query='+latitude+','+longitude

	request({url:url,json:true},(error,{body})=>{
		if(error)
		{
			callback('unable to connect to weather service',undefined)
		}
		else if(body.error)
		{
			callback('unable to find location ',undefined)
		}
		else
		{
			callback(undefined,'it is currently '+ body.current.temperature+' degrees out. There is a '+body.current.precip+' % chance of rain')
		}

	})

}

module.exports=forecast