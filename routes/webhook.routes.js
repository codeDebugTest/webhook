/**
 * Webhook 路由
 */

const express = require('express');
const {webhookController} = require('../controllers');

// eslint-disable-next-line new-cap
const router = express.Router();

// 抖音 Webhook 回调
router.post('/plateform/dy', webhookController.handleDouyinWebhook);
router.get('/plateform/dy', webhookController.handleDouyinWebhook);

module.exports = router;
