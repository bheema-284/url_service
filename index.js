const express = require("express")
const connectDB = require("./config/db")
const shortUrl = require("./models/url");  
const app = express();
app.use(express.urlencoded({extended : false}));
app.set("view engine", 'ejs')
const port = process.env.PORT || 8080;
app.get('/',async(req,res)=>{
const short = await shortUrl.find()
 res.render('index', { short: short });
})
app.post('/shorturls', async (req, res) => {
 await shortUrl.create({full:req.body.fullUrl});
res.redirect('/');

});
app.get('/:Url', async (req, res) => {
  let shortU = await shortUrl.findOne({ surl: req.params.shortU });
  if (shortU === null) return res.sendStatus(404);
  shortU.clicks++;
  shortU.save();

  res.redirect(shortU.full);
});
//app.listen(PORT,()=> console.log("Server Running on port",PORT))
app.listen(port, async () => {
  await connectDB();
  console.log('Listening on port', port);
});