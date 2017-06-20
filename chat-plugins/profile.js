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

Profile.prototype.background = function (user) {
	let bg = Db.backgrounds.get(user);
	if (!Db.backgrounds.has(buddy)) return '<div>';
	return '<div style="background:url(' + bg + ')">';
};

Profile.prototype.pokemon = function (user) {
	let pkmn = Db.pokemon.get(user);
	if (!Db.pokemon.has(user)) return label('Favorite Pokemon') + 'Not Set.';
	return label('Favorite Pokemon') + '<b><i>' + pkmn + '</i></b>';
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

Profile.prototype.badges = function (user) {
	let badgecss = ';border:none;background:none;';
	let badges = Db.badges.get(user);
	if (!Db.badges.has(user) && Db.music.has(user)) return '<br>';
	let badgeDisplay = '<br><br><div style="' + badgecss + '"><center>';
	if (!Db.badges.has(pal)) return '';
	for (let i = 0; i < badges.length; i++) {
		let img = Db.badgelist.get([badges[i], 'img']);
		let desc = Db.badgelist.get([badges[i], 'desc']);
		let id = Db.badgelist.get([badges[i], 'name']);
		badgeDisplay += '<button name="send" style="background:transparent;border:none;" value="/badge info, ' + id + '"><img src="' + img + '" title="' + id + ' : ' + desc + '"></button>';
	}
	badgeDisplay += '</center></div>';
	return badgeDisplay;
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
		SPACE + this.type(userid) + BR + 
		SPACE + this.pokemon(userid) + BR + + SPACE + this.badges(userid) +
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
	
		'deletebackground': 'deletebg',
	deletebg: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		let targ = target.toLowerCase();
		if (!target) return this.errorReply('USAGE: /deletebackground (user)');
		if (!Db.backgrounds.has(targ)) return this.errorReply('This user does not have a custom background.');
		Db.('backgrounds').delete(targ);
		this.sendReply('This users background has deleted.');
	},
	
		badge: function (target, room, user) {
		let parts = target.split(',');
		let acceptable = ['set', 'take', 'delete', 'add', 'list', 'info'];
		if (!acceptable.includes(parts[0])) return this.parse('/badgehelp');
		switch (parts[0]) {
		case 'add':
			let id = parts[1].trim().toLowerCase();
			let name = parts[1].trim();
			let img = parts[2].trim();
			let desc = parts[3].trim();
			if (!parts[3]) return this.errorReply('USAGE: /badge add, (name), (img), Description.');
			if (Db.badgelist.has(id)) return this.errorReply('There is a badge with this name already.');
			Db.badgelist
				.set([id, 'name'], name)
				.set([id, 'img'], img)
				.set([id, 'desc'], desc);
			let total = Db.badgelist.get('all');
			if (!Db.badgelist.has('all')) total = [];
			total.push(id);
			Db.badgelist.set('all', total);
			this.sendReplyBox('This badge has been successfully added.');
			break;
		case 'delete':
			let targbadge = parts[1].trim().toLowerCase();
			if (parts[2]) return this.errorReply('USAGE: /badge delete, (name)');
			if (!Db.badgelist.has(targbadge)) return this.errorReply('This badge does not exist.');
			Db.badgelist.delete(targbadge);
			let allbadgez = Db.badgelist.get('all');
			allbadgez = allbadgez.filter(b => b !== targbadge);
			Db.badgehlist.set('all', allbadgez);
			this.errorReply('This badge has been deleted.');
			let badgeUserObject = Db.('userBadges').object();
			let users = Object.keys(badgeUserObject);
			users.forEach(u => Db.('userBadges').set(u, (badgeUserObject[u].filter(b => b !== targbadge))));
			break;
		case 'set':
			let targUser = parts[1].trim().toLowerCase();
			let badge = parts[2].trim();
			if (!Db.badgelist.has(badge)) return this.errorReply('This badge does not exist.');
			if (!parts[2]) return this.errorReply('USAGE: /badge set, (user), (badge name)');
			let userBadges = Db.badges.get(targUser);
			if (!Db.badges.has(targUser)) userBadges = [];
			userBadges.push(badge);
			Db('badges').set(targUser, userBadges);
			let kekbadge = Db.badgelist.get([badge, 'img']);
			this.sendReply('This user has been succesfully given the ' + badge + ' badge.');
			Users(targUser).popup('|html|You have been given the <img src="' + kekbadge + '"> Badge.');
			break;
		case 'take':
			let usertarget = parts[1].trim().toLowerCase();
			let hasbadges = Db.badges.get(usertarget);
			let deletebadge = parts[2].trim().toLowerCase();
			let imgofbadge = Db.badgelist.get([deletebadge, 'img']);
			if (!parts[2]) this.errorReply('USAGE: /badge take, (user), (badge name).');
			hasbadges = hasbadges.filter(b => b !== deletebadge);
			Db.badges.set(usertarget, hasbadges);
			this.sendReply('This user has been stripped of the ' + deletebadge + ' badge.');
			Users(usertarget).popup('|html|You have been stripped of the the ' + imgofbadge + ' Badge.');
			break;
		case 'list':
			if (!this.runBroadcast()) return;
			let BadgeList = '<table border="1" width="100%" cellpadding="5px" cellspacing="0"><th>Badge Img</th><th>Badge Name</th><th>Badge Description</th>';
			let allbadges = Db('badgelist').get('all');
			for (let i = 0; i < allbadges.length; i++) {
				let badgeimg = Db.badgelist.get([allbadges[i], 'img']);
				let badgedesc = Db.badgelist.get([allbadges[i], 'desc']);
				let badgename = Db.badgelist.get([allbadges[i], 'name']);
				BadgeList += '<tr>';
				BadgeList += '<td><center><button style="background:transparent;border:none;" name="send" value="/badge info, ' + badgename + '"><img src="' + badgeimg + '" title="' + badgename + ' : ' + badgedesc + '"></button></center></td>';
				BadgeList += '<td><b>' + badgename + '</b></td>';
				BadgeList += '<td>' + badgedesc + '</td>';
				BadgeList += '</tr>';
			}
			this.sendReply('|html|' + BadgeList);
			break;
		case 'info':
			if (!this.runBroadcast()) return;
			if (!parts[1]) return this.errorReply('USAGE: /badge info, (badge name)');
			let infobadge = parts[1].trim().toLowerCase();
			let all = Db.badgelist.get('all');
			if (!all.includes(infobadge)) return this.errorReply('This badge does not exist.');
			let imginfo = Db.badgelist.get([infobadge, 'img']);
			let infodesc = Db.badgelist.get([infobadge, 'desc']);
			let infoname = Db.badgelist.get([infobadge, 'name']);
			this.sendReplyBox('<img src="' + imginfo + '">' + SPACE + infoname + ' : ' + infodesc);
			break;
		}
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
		},
			
			
	pokemon: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help pokemon");
		if (!parts[0]) return this.parse("/help pokemon");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/pokemon " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			let pkmn = [
				'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot', 'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull', 'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit', 'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill', 'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile', 'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham', 'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat', 'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch', 'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu', 'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock', 'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy', 'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho', 'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss', 'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 'Bidoof',
				'Bibarel', 'Kricketot', 'Kricketune', 'Shinx', 'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny', 'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling', 'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible', 'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario', 'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine', 'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott', 'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland', 'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear', 'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna', 'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika', 'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr', 'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh', 'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil', 'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle', 'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus', 'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish', 'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino', 'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion', 'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast', 'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent', 'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik', 'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent', 'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo', 'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk', 'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino', 'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja', 'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame', 'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar', 'Flabébé', 'Floette', 'Florges', 'Skiddo', 'Gogoat', 'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic', 'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle', 'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink', 'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg', 'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde', 'Volcanion', 'Diancie', 'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt', 'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee', 'Rockruff', 'Lyranoc', 'Wishiwashi', 'Mareanie', 'Toxapex', 'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena', 'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod', 'Sandygast', 'Palossand', 'Pyukumuku', 'Type: Null', 'Silvally', 'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu', 'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo',
				'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna',
			];
			if (!hex || !text) return this.errorReply("Ensure you have set a Pokemon and hex");

			let pokemon = '<font color = ' + hex + '><b>' + text + '</b></font>';
			if (Db.pokemon.has(user)) return false;
			Db.pokemon.set(user, pokemon);
			Users(user).send('|popup| You have recieved a Pokemon.');
			this.sendReply('|html|You have set a Pokemon.');
			break;
		case 'delete':
			if (!Db.pokemon.has(user)) return false;
			Db.pokemon.delete(user);
			Users(user).send('|popup| Your Pokemon has been removed.');
			this.sendReply("You have removed " + user + "s' Pokemon.");
			break;
		default:
			this.parse("/help pokemon");
		}
	},
	pokemonhelp: ["/pokemon set, user, hex, Pokemon - Sets a users Pokemon.",
		"/pokemon delete, user - Deletes a users Pokemon.",
	],
	
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
