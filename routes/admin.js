const router = require('express').Router();
const moment = require('moment-timezone');
const {auth, RecordModule, ip} = require('./misc.js');
require('dotenv').config();


router.get('/', async (req, res, next) => {
	// check permission
	if(req.cookies.admin !== process.env.admin) return next();

	await RecordModule.find({}, (err, data) => {
		var records = [];
		data.forEach((item)=>{
			console.log(moment(item.date).locale('zh-tw').tz('Asia/Taipei').format('LLLL'));
			records.push({
				code: item.code,
				url: item.url,
				date: moment(item.date).locale('zh-tw').tz('Asia/Taipei').format('LLLL'),
				ip: item.ip || 'none'
			});
		});
		console.table(records);
		res.cRender('admin', {
			records: records
		});
	});
});

module.exports = router;
