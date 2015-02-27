function ini(str) {
	return (function() {
		var title, delim = /\[(.*?)\]/, trim = /^\s+|\s+$/g, lines = str
				.replace(trim, '').split('\n'), op = [], o = {}, t, c;
		for ( var i = 0, len = lines.length; i < len; i++) {
			t = lines[i].replace(trim, '');
			if (t.length === 0 || t[0] === ";" || t[0] === "#") {
				continue;
			}
			op.push(t);
		}
		for ( var i = 0, len = op.length; i < len; i++) {
			t = op[i];
			if (delim.test(t)) {
				title = t.replace(delim, '$1');
				if (title) {
					o[title] = {};
				}
				continue;
			}
			c = t.split('=');
			if (title) {
				o[title][c[0]] = c[1];
			} else {
				o[c[0]] = c[1];
			}
		}
		return o;
	})();
}



function loadCards() {
	// NOTE:  This function must return the value from calling the $.ajax() method
	return $.ajax({
		type : "GET",
		url : "config/cards.xml",
		dataType : "xml",
		success : function(xml) {
			console.log("loaded cards");
		}
	});
}

function loadNPC() {
	// NOTE:  This function must return the value from calling the $.ajax() method
	return $.ajax({
		type : "GET",
		url : "config/npc.xml",
		dataType : "xml",
		success : function(xml) {
			console.log("loaded npc");
		}
	});
}

function parseCards(cardsXml, cards) {
	
	console.log(cardsXml);
	
	$(cardsXml).find("card").each(function() {
		console.log($(this).attr("id"));
		cards[$(this).attr("id")] = {
			id : $(this).attr("id"),
			name : $(this).attr("name"),
			top : $(this).attr("top"),
			left : $(this).attr("left"),
			right : $(this).attr("right"),
			bottom : $(this).attr("bottom")
		};
	});
	
	console.log(cards);
}

function parseNPC(npcXml, npc, cards) {
	// iterate through NPCs
	$(npcXml).find("npc").each(function() {	
		// get cards for this npc
		var npcCards = [];
		$(npcXml).find("npc[id=" + $(this).attr("id") +"] > cards >card").each(function() {
			npcCards.push(cards[$(this).attr("id")]);
		});
		
		// create npc object with cards and other info
		npc.push({
			id : $(this).attr("id"),
			name : $(this).attr("name"),
			location : $(this).attr("location"),
			cards : npcCards
		});
	});
	
	console.log(npc);
}