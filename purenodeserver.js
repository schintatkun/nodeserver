const http = require('http');
const url = require('url');
function handler(req, res){

    // console.log(req.url);
    const parsedUrl =url.parse(req.url, true);

    res.setHeader('x-server-date', new Date());
    console.log(parsedUrl);


    if(parsedUrl.pathname === '/'){
        //instruct browser how to render this page
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write('Hello, I am a webserver');
        return res.end();
    }
    else if (parsedUrl.pathname ==='/time') {
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write(new Date().toString());
        return res.end();
     }
    else if (parsedUrl.pathname==='/hello'){
        const name = parsedUrl.query.name;
        if(!name){
            res.writeHead(400, {'Content-type': 'text/plain'});
            res.write(`Name Not Found \n`);
            return res.end();
        }
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write(`Hello ${name}`);
        return res.end();
    }
    else if (parsedUrl.pathname.startsWith('/user/')){
        const regex = new RegExp('\/user\/(.+)');
        const matches = regex.exec(parsedUrl.pathname);
        if(!matches){
            res.writeHead(400, {'Content-type': 'text/plain'});
            res.write(`No match Found \n`);
            return res.end();
        }
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write(`User Profile of ${matches[1]}`);
        res.end(); 
    }
    else{
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found \n');
        return res.end();
    }

}
const server = http.createServer(handler);
server.listen(3000);