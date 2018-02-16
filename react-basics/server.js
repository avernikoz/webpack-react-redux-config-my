
let path = require('path');
let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, './')));

app.get('*', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});


app.listen(3001);