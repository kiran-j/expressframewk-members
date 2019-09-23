// const request = require('request-promise');
// const endpoint = 'https://api.github.com/users';
// const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36";

// (async function main(){
  
//     try {
//        const res = await request({
//             url:`${endpoint}/j-kiran/id`,
//             method : 'get',
//             headers: {
//                 'User-Agent': ua
//             }
//        });
//        console.log(res);
//     } catch (e) {
//         console.log(e.message);
//     }
// })();

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

//handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage Route
app.get('/', (req,res) => res.render('index',{
    title: 'Member App',
    members
}));

//Init middleware
app.use(logger);




//set static folder
app.use(express.static(path.join(__dirname,'public')));

//members api 
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port $(PORT)`));
