const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()


//define paths for express config
const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdir))

 

app.get('',(req,res)=>{
	res.render('index',{
		title:'weather',
		name:'prateek'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'about me',
		name:'prateek'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		help:'this is some helpful text',
		title:'help',
		name:'prateek' 
	})
})

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'you must provide an address'
		})
	}
	
	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error)
		{
			return res.send({ error})
		}
		forecast(latitude,longitude,(error,forecastdata)=>{
			if(error){
				return res.send({error})
			}
			res.send({
				forecast:forecastdata,
				location,
				address:req.query.address
			})
		})
	})


})

app.get('/products',(req,res)=>{

	if(!req.query.search){
		return res.send({
			error:'you must provide a search term'
		})
	}

	console.log(req.query.search)
	res.send({
		products:[]
	})
})

app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'prateek',
		errormsg:'help article not found'
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'prateek',
		errormsg:'page not found'
	})
})


app.listen(3000,()=>{
	console.log('server is up on port 3000')
})