const http = require("http").Server();
const io = require("socket.io")(http);

io.on("connection", socket => {
    console.log("Connected");
    socket.on("user-connected", user => {
        socket.user = user;
        io.emit("users-changed", { user: user, event: "conectado" });
    });

    socket.on("users-started", started => {
        socket.started = started;
        io.emit("users-started", { started: started, event: "started" });
    });

    socket.on("operation-question", _operationQuestion => {
        console.log(operationQuestion);
        socket.operationQuestion = _operationQuestion;
        io.emit("operation-question-changed", { operationQuestion: _operationQuestion, event: "operation question changed" });
    });

    socket.on("disconnect", () => {
        io.emit("users-changed", { user: socket.user, event: "desconectado" });
    });
});

let port = Number(process.env.PORT || 3000);

http.listen(port, () => {
    console.log("Listening on " + port);
});