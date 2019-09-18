'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default (sequelize, Vehiculo) => {
exports.default = function (sequelize, User, Event, Assistant, Talk) {
	var router = _express2.default.Router();

	router.route('/new-user').post(function (req, res) {
		var _req$body = req.body,
		    email = _req$body.email,
		    password = _req$body.password,
		    type = _req$body.type,
		    name = _req$body.name;

		User.findOne({ where: { email: email } }).then(function (userResponse) {
			if (userResponse) {
				res.status(200).json(userResponse);
				return;
			}
			var user = User.build({
				email: email,
				password: password,
				type: type,
				name: name
			});
			user.save().then(function (result) {
				res.status(200).json(result);
			}).catch(function (err) {
				res.status(500).send(err);
			});
		});
	});

	router.route('/new-event').post(function (req, res) {
		var _req$body2 = req.body,
		    topic = _req$body2.topic,
		    date = _req$body2.date,
		    scheduleStart = _req$body2.scheduleStart,
		    scheduleEnd = _req$body2.scheduleEnd,
		    address = _req$body2.address,
		    diary = _req$body2.diary;

		var event = Event.build({
			topic: topic,
			date: date,
			scheduleStart: scheduleStart,
			scheduleEnd: scheduleEnd,
			address: address,
			diary: diary
		});
		event.save().then(function (result) {
			res.status(200).json(result);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/events').get(function (req, res) {
		Event.findAll({
			where: {
				active: 1
			}
		}).then(function (events) {
			res.status(200).json(events);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/delete-event/:id').patch(function (req, res) {
		var id = req.params.id;


		Event.findByPk(id).then(function (event) {
			event.active = 0;
			event.save().then(function () {
				res.status(200).json(event);
			}).catch(function (err) {
				res.status(500).send(err);
			});
		});
	});

	router.route('/event/:id').patch(function (req, res) {
		var id = req.params.id;


		Event.findByPk(id).then(function (event) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.entries(req.body)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2),
					    key = _step$value[0],
					    value = _step$value[1];

					event[key] = value;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			event.save().then(function () {
				res.status(200).json(event);
			}).catch(function (err) {
				res.status(500).send(err);
			});
		});
	});

	router.route('/assistants/:userId').get(function (req, res) {
		var userId = req.params.userId;

		Assistant.findAll({
			where: {
				user: userId
			}
		}).then(function (assistants) {
			res.status(200).json(assistants);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/assistants').post(function (req, res) {
		var _req$body3 = req.body,
		    user = _req$body3.user,
		    event = _req$body3.event;

		var assistant = Assistant.build({
			user: user,
			event: event
		});
		assistant.save().then(function (result) {
			res.status(200).json(result);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/talk').post(function (req, res) {
		var _req$body4 = req.body,
		    user = _req$body4.user,
		    userName = _req$body4.userName,
		    email = _req$body4.email,
		    title = _req$body4.title,
		    aboutTalk = _req$body4.aboutTalk,
		    aboutYou = _req$body4.aboutYou,
		    twitter = _req$body4.twitter,
		    linkedin = _req$body4.linkedin,
		    facebook = _req$body4.facebook;

		var talk = Talk.build({
			user: user,
			userName: userName,
			email: email,
			title: title,
			aboutTalk: aboutTalk,
			aboutYou: aboutYou,
			twitter: twitter,
			linkedin: linkedin,
			facebook: facebook
		});
		talk.save().then(function (result) {
			res.status(200).json(result);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	return router;
};
//# sourceMappingURL=methods.js.map