const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};
const db = {};

http.createServer(async (req, res)=> {
  console.log(req.method, req.url );
  const cookies = parseCookies(req.headers.cookie);

  try{
    if(req.method === 'GET'){
      if(req.url === '/'){
        if(cookies.session){
          const data = await fs.readFile('./todo.html');
          res.writeHead(200, {'Content-Type': 'text/html; charset:utf-8'});
          res.end(data);
        }else {
          const data = await fs.readFile('./login.html');
          res.writeHead(200, {'Content-Type': 'text/html; charset:utf-8'});
          res.end(data);
        }
      }else if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { userid } = qs.parse(query);
        if(userid in session){
          const expires = new Date();
          // 쿠기 유효시간을 현재 시간 + 5분으로 설정
          expires.setMinutes(expires.getMinutes() + 5);
          session[userid].expires = expires;
          res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${session[userid].uniqueInt}; Expires=${session[userid].expires.toGMTString()}; HttpOnly; Path=/`,
          });
          res.end();
        }else {
          const expires = new Date();
          // 쿠기 유효시간을 현재 시간 + 5분으로 설정
          expires.setMinutes(expires.getMinutes() + 5);
          const uniqueInt = Date.now();
          session[userid] = {
            uniqueInt,
            expires,
          };
          db[userid] = [];
          res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${session[userid].uniqueInt}; Expires=${session[userid].expires.toGMTString()}; HttpOnly; Path=/`,
          });
          res.end();
        }

      }else if(req.url === '/name'){
        Object.keys(session).map((userid) => {
          if(session[userid].uniqueInt === parseInt(cookies.session)){
            res.end(userid);
          }
        });
      }else if(req.url === '/todos'){
        Object.keys(session).map((userid) => {
            if(session[userid].uniqueInt === parseInt(cookies.session)){
              res.writeHead(201);
              res.end(JSON.stringify(db[userid]));
            }
          });
      }else {
        try {
            const data = await fs.readFile(`.${req.url}`);
            return res.end(data);
          } catch (err){
            res.writeHead(404);
            res.end('404 Not Found');
          }
      }
    }else if(req.method === 'POST'){
       if(req.url === '/todo'){
        let body ='';
        // 요청의 body 를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        
        req.on('end', () => {
          Object.keys(session).map((userid) => {
            if(session[userid].uniqueInt === parseInt(cookies.session)){
             
              db[userid].push(JSON.parse(body));
              db[userid].sort((a, b) => { return a.id - b.id});
              console.log(db[userid]);
              res.writeHead(201);
              res.end('등록 성공');
            }
          });
        });

       }
    }else if(req.method === 'PUT'){

    }else if(req.method === 'DELETE'){
      if(req.url.startsWith('/todo')){
        const id = req.url.split('/')[2];
        console.log(id);
        Object.keys(session).map((userid) => {
            if(session[userid].uniqueInt === parseInt(cookies.session)){
             console.log(db[userid]); 
             db[userid] = db[userid].filter((todo) => {
                             return todo.id !== parseInt(id);
                           })
              res.writeHead(201);
              res.end('삭제 성공');
              console.log(db[userid]);
            }
          });        
      }
    }
  }catch(err) {
    console.error(err);

  }
  })
    .listen(8084, () => {
      console.log('8084번 포드에서 서버 대기 중입니다!');
    })
  
  