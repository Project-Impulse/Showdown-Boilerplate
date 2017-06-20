'use strict';
/*eslint no-restricted-modules: [0]*/

let color = require('../config/color');
let moment = require('moment');

let BR = '<br>';
let ServerIP = 'dedicatedrpsever-lustyash.c9users.io';
let SPACE = '&nbsp;';
let profileColor = '#24678d';
let trainersprites = [1, 2, 101, 102, 169, 170, 265, 266, 168];

/**
 * Profile constructor.
 *
 * @param {Boolean} isOnline
 * @param {Object|String} user - if isOnline then Object else String
 * @param {String} image
 */
function Profile(isOnline, user, image) {
	this.isOnline = isOnline || false;
	this.user = user || null;
	this.image = image;

	this.username = Chat.escapeHTML(this.isOnline ? this.user.name : this.user);
	this.url = 'http://dedicatedrpsever-lustyash.c9users.io';
}

/**
 * Create an bold html tag element.
 *
 * Example:
 * createFont('Hello World!');
 * => '<b>Hello World!</b>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function bold(text) {
	return '<b>' + text + '</b>';
}

/**
 * Create an font html tag element.
 *
 * Example:
 * createFont('Hello World!', 'blue');
 * => '<font color="blue">Hello World!</font>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

/**
 * Create an img tag element.
 *
 * Example:
 * createImg('phil.png');
 * => '<img src="phil.png" height="80" width="80" align="left">'
 *
 * @param {String} link
 * @return {String}
 */
function img(link) {
	return '<img src="' + link + '" height="80" width="80">';
}

/**
 * Create a font html element wrap around by a bold html element.
 * Uses to `profileColor` as a color.
 * Adds a colon at the end of the text and a SPACE at the end of the element.
 *
 * Example:
 * label('Name');
 * => '<b><font color="#24678d">Name:</font></b> '
 *
 * @param {String} text
 * @return {String}
 */
function label(text) {
	return bold(font(profileColor, text + ':')) + SPACE;
}

function currencyName(amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
}

Profile.prototype.avatar = function () {
	if (this.isOnline) {
		if (typeof this.image === 'string') return img(this.url + ':80/avatars/' + this.image);
		return img('http://play.pokemonshowdown.com/sprites/trainers/' + this.image + '.png');
	}
	for (let name in Config.customAvatars) {
		if (this.username === name) {
			return img(this.url + ':' + Config.port + '/avatars/' + Config.customAvatars[name]);
		}
	}
	let selectedSprite = trainersprites[Math.floor(Math.random() * trainersprites.length)];
	return img('http://play.pokemonshowdown.com/sprites/trainers/' + selectedSprite + '.png');
};

Profile.prototype.buttonAvatar = function () {
	let css = 'border:none;background:none;padding:0;float:left;';
	return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + this.avatar() + "</button>";
};

Profile.prototype.group = function () {
	if (this.isOnline && this.user.group === ' ') return label('Group') + 'Regular User';
	if (this.isOnline) return label('Group') + Config.groups[this.user.group].name;
	for (let name in Users.usergroups) {
		if (toId(this.username) === name) {
			return label('Group') + Config.groups[Users.usergroups[name].charAt(0)].name;
		}
	}
	return label('Group') + 'Regular User';
};

Profile.prototype.money = function (amount) {
	return label('Money') + amount + currencyName(amount);
};

Profile.prototype.name = function () {
	return label('Name') + bold(font(color(toId(this.username)), this.username));
};

Profile.prototype.setfavoritepokemon = function (user) {
	let setfavoritepokemon = Db.crush.get(user);
	if (!Db.crush.has(user)) return label('Crush') + 'This user does not have a crush set.';
	return label('Crush') + '<b><i>"' + setfavoritepokemon + '"</i></b>';
};

Profile.prototype.background = function (user) {
	let bg = Db.backgrounds.get(user);
	if (!Db.backgrounds.has(buddy)) return '<div>';
	return '<div style="background:url(' + bg + ')">';
};

Profile.prototype.type = function (user) {
	let type = Db.type.get(user);
	if (!Db.type.has(user)) return label('Type') + 'None';
	if (type === 'Grass') {
		type = '<font color="#008000"><b><i>Grass</i></b></font>';
	}
	if (type === 'Poison') {
		type = '<font color="#800080"><b><i>Poison</i></b></font>';
	}
	if (type === 'Fire') {
		type = '<font color="#ff0000"><b><i>Fire</i></b></font>';
	}
	if (type === 'Water') {
		type = '<font color="#0000cd"><b><i>Water</i></b></font>';
	}
	if (type === 'Electric') {
		type = '<font color="#ffff00"><b><i>Electric</i></b></font>';
	}
	if (type === 'Psychic') {
		type = '<font color="#da70d6"><b><i>Psychic</i></b></font>';
	}
	if (type === 'Normal') {
		type = '<font color="#ffffff"><b><i>Normal</i></b></font>';
	}
	if (type === 'Ground') {
		type = '<font color="#ff8c00"><b><i>Ground</i></b></font>';
	}
	if (type === 'Ice') {
		type = '<font color="#87cefa"><b><i>Ice</i></b></font>';
	}
	if (type === 'Rock') {
		type = '<font color="#ao552d"><b><i>Rock</i></b></font>';
	}
	if (type === 'Dragon') {
		type = '<font color="#4b0082"><b><i>Dragon</i></b></font>';
	}
	if (type === 'Bug') {
		type = '<font color="#adff2f"><b><i>Bug</i></b></font>';
	}
	if (type === 'Dark') {
		type = '<font color="#8b4513"><b><i>Dark</i></b></font>';
	}
	if (type === 'Fighting') {
		type = '<font color="#800000"><b><i>Fighting</i></b></font>';
	}
	if (type === 'Flying') {
		type = '<font color="#87ceeb"><b><i>Flying</i></b></font>';
	}
	if (type === 'Ghost') {
		type = '<font color="#8a2be2"><b><i>Ghost</i></b></font>';
	}
	if (type === 'Steel') {
		type = '<font color="#c0c0c0"><b><i>Steel</i></b></font>';
	}
	if (type === 'Fairy') {
	type = '<font color="#ff69b4"><b><i>Fairy</i></b></font>';
	}
	return label('Type') + type;
};

Profile.prototype.seen = function (timeAgo) {
	if (this.isOnline) return label('Last Seen') + font('#2ECC40', 'Currently Online');
	if (!timeAgo) return label('Last Seen') + 'Never';
	return label('Last Seen') + moment(timeAgo).fromNow();
};

Profile.prototype.title = function () {
	let title = Db.TitleDB.get(toId(toId(this.user)));
	if (typeof title !== 'undefined' && title !== null)  return ' (<font color=#' + title[0] + '><b>' + Chat.escapeHTML(title[1]) + '</b></font>)';
	return '';
};

Profile.prototype.show = function (callback) {
	let userid = toId(this.username);

	return this.background(userid) + this.buttonAvatar() +
		SPACE + this.name() + SPACE + this.title() + BR +
		SPACE + this.group() + BR +
		SPACE + this.money(Db.money.get(userid, 0)) + BR +
		SPACE + this.seen(Db.seen.get(userid)) + BR +
		SPACE + this.type(userid) + SPACE + +SPACE + this.setfavoritepokemon(userid) + BR +
		'<br clear="all">';
};

exports.commands = {
	profile: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (target.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		let targetUser = this.targetUserOrSelf(target);
		let profile;
		if (!targetUser) {
			profile = new Profile(false, target);
		} else {
			profile = new Profile(true, targetUser, targetUser.avatar);
		}
		this.sendReplyBox(profile.show());
	},
	
	'setcrush': function (target, room, user) {
		if (!target) return this.errorReply('USAGE: /setcrush (code)');
		Db.crush.set(user.userid, target);
		return this.sendReply('You have succesfully set your crush  to : ' + target);
	},
	
		bg: 'setbg',
	setbackground: 'setbg',
	setbg: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.errorReply('USAGE: /setbackground (user), (link)');
		let targ = parts[0].toLowerCase().trim();
		let link = parts[1].trim();
		Db.backgrounds.set(targ, link);
		this.sendReply('This users background has been set to : ');
		this.parse('/profile ' + targ);
	},
	
		type: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help type");
		if (!parts[0]) return this.parse("/help type");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/type " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			let types = ['Normal', 'Grass', 'Poison', 'Fire', 'Water', 'Bug', 'Flying', 'Electric', 'Rock', 'Ground', 'Steel', 'Ice', 'Dragon', 'Fairy', 'Psychic', 'Fighting', 'Dark', 'Ghost'];
			if (!hex || !text) return this.errorReply("Ensure you have set a type and hex");

			let type = '<font color = ' + hex + '><b>' + text + '</b></font>';
			if (Db.type.has(user)) return false;
			Db.type.set(user, type);
			Users(user).send('|popup| You have recieved type.');
			this.sendReply('|html|You have set a type.');
			break;
		case 'delete':
			if (!Db.type.has(user)) return false;
			Db.type.delete(user);
			Users(user).send('|popup| Your type has been removed.');
			this.sendReply("You have removed " + user + "s' type.");
			break;
		default:
			this.parse("/help type");
		}
	
	customtitle: function (target, room, user) {
		let parts = target.split(',');
		let cmd = parts[0].trim().toLowerCase();
		let userid, targetUser;
		let title = [];
		switch (cmd) {
		case 'set':
			if (!this.can('lock') && !this.can('vip')) return false;
			let reg = /^\w+$/;
			userid = toId(parts[1]);
			targetUser = Users.getExact(userid);
			if (!userid) return this.sendReply("You didn't specify a user.");
			if (!Users.get(targetUser)) return this.errorReply('The target user is not online.');
			if (targetUser.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
			if (targetUser.length < 3) return this.sendReply("Usernames are required to be greater than 2 characters long.");
			if (!reg.test(parts[2].trim())) return this.sendReply("Enter only alphanumeric characters for the eg. ff80b3");
			if (parts.length < 4) return this.sendReply("Invalid command. Valid commands are `/customtitle set, user, color, title`.");
			if (toId(targetUser) !== toId(user) && !this.can('lock')) return this.sendReply("You must be staff to set other people their custom title.");
			title[0] = parts[2].trim();
			title[1] = Chat.escapeHTML(parts.slice(3).join(",").trim());
			if (title[1].length > 30) return this.errorReply("Custom titles cannot be longer than 30 characters.");
			Db.TitleDB.set(toId(userid), title);
			Users.get(userid).popup('|modal||html|<font color="red"><strong>ATTENTION!</strong></font><br /> You have received a custom title from <b><font color="' + color(user.userid) + '">' + Chat.escapeHTML(user.name) + '</font></b>: ' + '<font color=' + title[0] + '> <b>' + Chat.escapeHTML(title[1]) + '</b></font>');
			this.sendReply("Usertitle set.");
			break;
		default:
			return this.sendReply("Invalid command. Valid commands are `/customtitle set, user, color, title`.");
		}
	},
	profilehelp: ["/profile -	Shows information regarding user's name, group, money, and when they were last seen."],
};
