var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });
// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

//当客户端与服务端建立WebSocket 连接成功会触发connection事件
io.on('connection', function(socket){
    console.log('来了,老弟');

    // 给客户端发送消息 参数1：消息类型 参数2：消息内容
    // setInterval(() => {
    //     socket.emit('time',Date.now())
    // }, 1000);
    // socket.on('hello',data => {
    //     console.log('hello->',data+Date.now())
    // })


    socket.on('message',data => {
        console.log('消息:',data)
        //socket.emit('','')只能发给一个当前的客户端
        io.emit('chat-message',data);//广播给所有的客户端
    })

    socket.on('disconnect', function(){
    console.log('拜拜了');
    });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});