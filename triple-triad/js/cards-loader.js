function getCardsXml() {
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

function getNpcXml() {
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

function loadCards(cardsXml, cards) {
	
	console.log("Loading cards");
	
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

function loadNpc(npcXml, npc, cards) {
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