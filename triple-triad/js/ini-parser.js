function ini(str) {
	return (function() {
		var title, delim = /\[(.*?)\]/, trim = /^\s+|\s+$/g, lines = str
				.replace(trim, '').split('\n'), op = [], o = {}, t, c;
		for (var i = 0, len = lines.length; i < len; i++) {
			t = lines[i].replace(trim, '');
			if (t.length === 0 || t[0] === ";" || t[0] === "#") {
				continue;
			}
			op.push(t);
		}
		for (var i = 0, len = op.length; i < len; i++) {
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

	var cards = [];

	$.ajax({
    type: "GET",
		url: "config/cards.xml",
		dataType: "xml",
		success: function(npcXml) {
			$(cardsXml).find("card").each(function() {
				console.log($(this).attr("id"));
				cards[$(this).attr("id")] = {
						name: $(this).attr("id"),
						top: $(this).attr("top"),
						left: $(this).attr("left"),
						right: $(this).attr("right"),
						bottom: $(this).attr("bottom")
					};
			});

			console.log(cards);
		}
	});
}

function loadNPC() {


	var npc = [].

	$.ajax({
		type: "GET",
		url: "config/npc.xml",
		dataType: "xml",
		success: function(npcXml) {
			$(cardsXml).find("npc").each(function() {


			});

			console.log(npc);
		}
	});

}
