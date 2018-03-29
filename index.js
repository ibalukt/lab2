const http = require('http');
const fs = require('fs');
const data = require('./top_2018_movies.json');


//var readStream = fs.createReadStream('sample_text.txt', 'utf8');
var writeStream = fs.createWriteStream('write_file.txt');

var page = "<html><head></head><body><h1>"

http.createServer(function(req,res) {

    if(req.url === '/') //|| (req.url === '/'))
        {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream('index.html').pipe(res);

        }

    else if (req.url === '/all_movies')
        {   
            page = "<html><head></head><body><h1>"
            listMovies();
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        }

    else if (req.url === '/action')
        {
            page = "<html><head></head><body><h1>"
            grossed20AndAction();
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        }

    else if (req.url === '/pg')
        {
            page = "<html><head></head><body><h1>"
            pg13And1To5mil();
            res.writeHead(200, {'Content-type': 'text.html'});
            res.write(page);
            res.end();

        }

    else if (req.url === '/distribution')
        {
            page = "<html><head></head><body><h1>"
            distributor();
            res.writeHead(200, {'Content-type': 'text.html'});
            res.write(page);
            res.end();
        }
    
    else {
            page = "<html><head></head><body><h1> 404 Page Not Found </h1></body></html>"
            res.writeHead(404, {'Content-type': 'text.html'});
            res.write(page);
            res.end();
    }


}).listen(3000);


const numberOfItems = data.length;
var arr = [];

function init()
{
    for(i = 0; i < numberOfItems; i += 1)
        {                
            
            //For Array[i], create an array within that array;
            arr[i] = [];
        
            for (j = 0; j <= 6; j += 1)
            {  
                //This puts the appropiate value in the appropriate index within the inner array.
                switch (j) {
                    case 0:arr[i][j] = data[i].rank; break;
                    case 1:arr[i][j] = data[i].movie; break;  
                    case 2:arr[i][j] = data[i].distributor; break;    
                    case 3:arr[i][j] = data[i].genre; break;
                    case 4:arr[i][j] = data[i].mpaa; break;
                    case 5:arr[i][j] = data[i].gross; break;  
                    case 6:arr[i][j] = data[i].tickets_sold; break; 
                }  
            }
        }
}

//Function that lists all the movies

function listMovies()
{
    page = page + "This is a list of all movies in the database</h1><ul>"
    for(i = 0; i < numberOfItems; i += 1){
        page = page + "<li>" + arr[i][1] + "</li>";
        console.log("name: " + arr[i][1]);
    }
    page = page + "</ul></body></html>";
}

//init();
//listMovies();

//Function that lists the movies that grossed above 20 million and genre is action
function grossed20AndAction()
{
    page = page + "This is a list of action movies that grossed 20 million</h1><ul>"
    for(i = 0; i < numberOfItems; i += 1){
        if ((arr[i][3] === "Action") && (arr[i][5] > 20000000)){
            page = page + "<li>" + arr[i][1] + "</li>";
            console.log("name: " + arr[i][1]);
        }
    }
    page = page + "</ul></body></html>";    
}

//init();
//grossed20AndAction();

//Function that lists the movies that are rated "PG-13", and number of tickets sold is between 1 and 5 million
function pg13And1To5mil()
{
    page = page + "This is a list of PG-13 movies that sold between 1 and 5 million tickets</h1><ul>"
    for(i = 0; i < numberOfItems; i += 1){
        if ((arr[i][4] === "PG-13") && (arr[i][6] <= 5000000) && (arr[i][6] >= 1000000)){
            page = page + "<li>" + arr[i][1] + "</li>";
            console.log("name: " + arr[i][1]);
        }
    } 
    page = page + "</ul></body></html>";  
}

//init();
//pg13And1To5mil();

//Funtion that sors the movies based on "distribution"
var newItem = true;
var distributors = [];
var temp;
var index = 0;

function distributor()
{
    newItem = true;
    distributors.splice(0,distributors.length)
    page = page + "This is a list of the movies sorted by the distributor</h1>"

    for (i = 0; i < numberOfItems; i += 1)
    {
        index = 0;
        temp = arr[i][2];
        //console.log("distributor:" + arr[i][2]);
    
        for (j = 0; j < numberOfItems; j += 1)
        {
            if ((temp == distributors[j]) && (j < i))
            {
                newItem = false;
                break;
            }
            else
            {
                newItem = true;
            }
        }

        if (newItem === true)
        {
            page = page + "<h2>" + temp + "</h2> <ul>";
            console.log("distributor: " + temp)
            while (index < numberOfItems)
            {
                if (arr[index][2] === temp)
                {
                    page = page + "<li>" + arr[index][1] + "</li>" ;
                    console.log("movie" + arr[index][1])
                }
                index += 1;
            }
            distributors.push(temp);   
            page = page + "</ul>";        
        }
     }
     page = page + "</body></html>";
}

init();
//distributor();

