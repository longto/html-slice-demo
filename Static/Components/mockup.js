var isMockup = window.location.href.indexOf(".html")>=0;

var includeHTML = function(cb) {
	var z, elmnt, file, xhttp,loop,content;
	z = document.querySelectorAll("[w3-include-html]");
	for (var i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("w3-include-html");
		loop = +elmnt.getAttribute("w3-include-loop") || 1;
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					content = "";
					for (var j=0;j<loop;j++) content+=this.responseText;
					elmnt.innerHTML = content;
					elmnt.removeAttribute("w3-include-html");
					elmnt.setAttribute("w3-include-loop","0");
					includeHTML(cb);
				}
			}      
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
	document.querySelectorAll("[w3-include-loop]").forEach(function(ele,i){
		while(ele.childNodes.length>0){
			ele.parentNode.insertBefore(ele.childNodes[0],ele);
		}
		ele.parentNode.removeChild(ele);
	});
	if (cb) cb();
};

var mainMockup = function() {
	var randomData = function(){
		var random = function(range){
			var len = Math.random() * 10;
			len = !range||range.length==0 ? len : range.length == 1 ? +range[0] : +range[0] + (Math.random() * range[1]);
			return len;
		}
		var images = [
			"http://i.huffpost.com/gadgets/slideshows/296089/slide_296089_2421899_free.jpg",
			"https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-2015-/large/languageartscover.jpg?1384968217",
			"https://images-na.ssl-images-amazon.com/images/I/51UNCiQbEUL._SX258_BO1,204,203,200_.jpg",
			"https://upload.wikimedia.org/wikipedia/en/1/11/Red_Dog_%28book_cover%29.jpg",
			"https://orgtheory.files.wordpress.com/2006/07/spacebetween.jpg",
			"https://i0.wp.com/lovelaughwoof.mystagingwebsite.com/wp-content/uploads/2016/08/book-cover.gif",
			"http://www.writersedit.com/wp-content/uploads/2014/08/luminaries.jpg",
			"http://payload.cargocollective.com/1/2/88505/1542390/Laszlito-%20Potica%20para%20Cosmonautas.jpg",
			"https://images-na.ssl-images-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
			"https://marketplace.canva.com/MACXDhG9jhE/1/0/thumbnail_large/canva-vintage-photo-wattpad-book-cover-MACXDhG9jhE.jpg",
			"https://marketplace.canva.com/MACUm9uSz8w/1/0/thumbnail_large/canva-girl-outdoor-photo-wattpad-covers-MACUm9uSz8w.jpg",
			"https://marketplace.canva.com/MACXI0m2fqc/1/0/thumbnail_large/canva-black-and-white-simple-elegant-wattpad-book-cover-MACXI0m2fqc.jpg",
			"https://marketplace.canva.com/MACF5OFkrMY/2/0/thumbnail_large/canva-monochrome-thriller-wattpad-cover-MACF5OFkrMY.jpg",
			"https://marketplace.canva.com/MACXD2kzeVo/2/0/thumbnail_large/canva-girl-photo-wattpad-book-cover-MACXD2kzeVo.jpg",
			"https://marketplace.canva.com/MACXDdpO70U/1/0/thumbnail_large/canva-green-brown-island-survival-wattpad-book-cover-MACXDdpO70U.jpg",
			"https://marketplace.canva.com/MACU6QcC1f8/1/0/thumbnail_large/canva-beige-wattpad-cover-MACU6QcC1f8.jpg"
		];
		var text = "Red hair crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook N.E.W.T., Honeydukes eriseD inferi Wormtail. Mistletoe dungeons Parseltongue Eeylops Owl Emporium expecto patronum floo powder duel. Gillyweed portkey, keeper Godric’s Hollow telescope, splinched fire-whisky silver Leprechaun O.W.L. stroke the spine. Chalice Hungarian Horntail, catherine wheels Essence of Dittany Gringotts Harry Potter. Prophecies Yaxley green eyes Remembrall horcrux hand of the servant. Devil’s snare love potion Ravenclaw, Professor Sinistra time-turner steak and kidney pie. Cabbage Daily Prophet letters from no one Dervish and Banges leg. Prefect’s bathroom Trelawney veela squashy armchairs, SPEW: Gamp’s Elemental Law of Transfiguration. Magic Nagini bezoar, Hippogriffs Headless Hunt giant squid petrified. Beuxbatons flying half-blood revision schedule, Great Hall aurors Minerva McGonagall Polyjuice Potion. Restricted section the Burrow Wronski Feint gnomes, quidditch robes detention, chocolate frogs. Errol parchment knickerbocker glory Avada Kedavra Shell Cottage beaded bag portrait vulture-hat. Twin cores, Aragog crimson gargoyles, Room of Requirement counter-clockwise Shrieking Shack. Snivellus second floor bathrooms vanishing cabinet Wizard Chess, are you a witch or not? Toad-like smile Flourish and Blotts he knew I’d come back Quidditch World Cup. Fat Lady baubles banana fritters fairy lights Petrificus Totalus. So thirsty, deluminator firs’ years follow me 12 inches of parchment. Head Boy start-of-term banquet Cleansweep Seven roaring lion hat. Unicorn blood crossbow mars is bright tonight, feast Norwegian Ridgeback. Come seek us where our voices sound, we cannot sing above the ground, Ginny Weasley bright red. Fanged frisbees, phoenix tears good clean match.".split(" ");
		document.querySelectorAll("[data-random-image]").forEach(function(e,i){
			var len = random([0,images.length])|0;
			e.setAttribute("src",images[len]);
		});
		document.querySelectorAll("[data-random-hidden]").forEach(function(e,i){
			var len = random([0,2]) | 0;
			if (len == 0) e.style.display = "none";
		});
		document.querySelectorAll("[data-random-text]").forEach(function(e,i){
			var len = random(e.getAttribute("data-random-text").split(",")) | 0,
				start = Math.random() * (text.length - len) | 0 ,
			sub = text.slice(start,start+len).join(" ");			
			e.innerHTML = sub;
		});
		document.querySelectorAll("[data-random-number]").forEach(function(e,i){
			var len = random(e.getAttribute("data-random-number").split(",")) | 0;
			e.innerHTML = len;		
		});
		document.querySelectorAll("[data-random-price]").forEach(function(e,i){
			var len = (random(e.getAttribute("data-random-price").split(",")) | 0) - 0.01;
			e.innerHTML = len;		
		});
	}
	if (isMockup) {
		randomData();	
	}
};

if (isMockup){
	includeHTML(mainMockup);
}