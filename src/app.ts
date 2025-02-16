import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
import {analyticsRouter} from "./serverScripts/analytics";
import {__dirname, basicRateLimitConfig, port,} from "./serverScripts/consts";
import {photonApiRouter} from "./serverScripts/photonApi";
import {cacheControl, checkSslAndWww, safeExc, safeExcAsync} from "./serverScripts/utils";

const app = express();
// middlewares

// SHH: all requests will first hit this middleware
app.use((req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.path)
	next()
})

app.use(compression())
app.use(helmet({
	contentSecurityPolicy: false,
	crossOriginEmbedderPolicy: false,
}));
app.use(safeExc(checkSslAndWww));
// app.use(safeExc(cacheControl));
app.use(express.static('static'));
app.use(bodyParser.json());

// paths

app.use("/api", photonApiRouter);
// /data instead of /analytics used to avoid getting blocked by adblockers
app.use("/data", analyticsRouter);

// catch all paths and check ssl, since app.use middleware doesn't seem to get called here
app.get("*", [RateLimit(basicRateLimitConfig), checkSslAndWww], safeExc((req, res) => {
	res.sendStatus(404);
	// or: res.redirect('/index.html');
}));

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
});
