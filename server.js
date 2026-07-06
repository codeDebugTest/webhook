const express = require('express');
const cors = require('cors');
const {webhookRoutes} = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 健康检查接口
app.get('/health', (req, res) => {
    res.json({status: 'ok', message: 'Server is running'});
});

// Webhook 路由（请求日志）
app.use('/webhook', (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`[Webhook] ${req.method} ${req.path}`);
    // eslint-disable-next-line no-console
    console.log(`  query: ${JSON.stringify(req.query)}`);
    // eslint-disable-next-line no-console
    console.log(`  body:  ${JSON.stringify(req.body)}`);
    next();
});
app.use('/webhook', webhookRoutes);

// 启动服务器
// eslint-disable-next-line no-console
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
