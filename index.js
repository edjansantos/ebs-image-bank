const   express = require('express'),
        compression = require('compression'),
        bodyParser = require('body-parser'),
        __PORT = process.env.PORT || 3005,
        cors = require('cors'),
        app = express();

console.log(`EBS Image Bank initializing...`);  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        "preflightContinue": true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Access-Token", "bs-user"]
    }));

console.log(`Loading modules...`);  
app.ebsSettings = require('./core/server/settings')(app);
require('./core/server/upload')(app);
require('./core/server/images')(app);
console.log(`Modules loaded...`);  

app.listen(__PORT, () => {
    console.log(`Running on port ${__PORT}`);
});