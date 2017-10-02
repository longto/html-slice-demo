//if IE
var isIE = navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1);
/*forEach polyfill*/
if (isIE && !Object.prototype.forEach) {
	Object.prototype.forEach = function(callback/*, thisArg*/) {
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = arguments[1];
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}

var main = function() {
	var fadeIn = function(el,toggleClass) {
		el.style.opacity = 0;
		el.classList.remove(toggleClass);
		var tick = function() {
			el.style.opacity = +el.style.opacity + 0.15;
			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			} else {
				el.style.opacity = 1;
			}
		};
		tick();
	}
	var fadeOut = function(el,toggleClass) {
		el.style.opacity = 1 ;
		var tick = function () {
			el.style.opacity = +el.style.opacity - 0.15;
			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			} else {
				el.style.opacity = 0;
				el.classList.add(toggleClass);
			}
		};
		tick();
	}
	var addToggleListener = function(toggleClass,effect){
	  document.querySelectorAll("[data-toggle="+toggleClass+"]").forEach(function(ele,inx){
	    ele.addEventListener("click",function(e){
	    	e.preventDefault();	    	
	    	var ele = e.target;
	    		targetEle = document.querySelector(ele.getAttribute("data-target-id") || "");
	    	ele.classList.toggle("active");
	    	if (effect){
	    		if (targetEle.classList.contains(toggleClass)){
		    		fadeIn(targetEle,toggleClass);
		    	} else{
		    		fadeOut(targetEle,toggleClass);
		    	}	
	    	} else{
				targetEle.classList.toggle("active");
	    	}
	    });    
	  });
	}
	addToggleListener("hidden",true);
	addToggleListener("slide");
	
    /* tab panel change */
    document.querySelectorAll(".nav li").forEach(function(ele,inx){
    	ele.addEventListener("click",function(e){
			e.preventDefault();
			var currentLink = e.target,//a
				currentMenu = e.target.parentNode,//li
				currentNav = e.target.parentNode.parentNode;//ul
			currentNav.querySelectorAll("li").forEach(function(ele,inx){
				ele.classList.remove("active");
				document.querySelector(ele.querySelector("a").getAttribute("href")).classList.remove("active","in");
			});
			currentMenu.classList.add("active");
			document.querySelector(currentLink.getAttribute("href")).classList.add("active","in");
		});
    });

    document.querySelectorAll(".search-control").forEach(function(ele,i){
    	var query = ele.querySelector("#q"),
    		autoSuggest = ele.querySelector(".auto-suggestion");
    	query.addEventListener("input",function(e){
	    	var q = e.target.value;
	    	if (q.length>=3) autoSuggest.classList.add("active")
	    	else autoSuggest.classList.remove("active");
	    });
    });
	
	var showError = function(){
		var hash = window.location.hash||"";
		if (hash.indexOf("error")>-1){
			var css = '[class*="error"]{display: block;}',
    			head = document.head || document.getElementsByTagName('head')[0],
    			style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet){
			  style.styleSheet.cssText = css;
			} else {
			  style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);
			document.querySelectorAll(".form-control").forEach(function(e,i){
				e.classList.add("error");
			});
		}		
	}
	showError();

	var gridChange = function(){
		var gridSelector = document.querySelector(".grid-selector"),
			productItem = document.querySelectorAll(".search-product-item");
		if (gridSelector && productItem){
			gridSelector.addEventListener("change", function (e) {
				productItem.forEach(function(ele,i) {
					ele.classList.toggle("show-list");
				})
			});
		}
	}	
	gridChange();

	//dropdown select
	var dropdownSelect = function(){
		var dropdown = document.querySelector(".filter-controller .dropdown");
		var selectBtn = document.querySelector(".filter-controller #sorting_condition");
		if(!dropdown||!selectBtn) return;
		selectBtn.addEventListener("click", function(e){
			dropdown.classList.add("open");
			document.querySelector(".bgr-transparent").style.display = "block";
		})
		var optionSelected = document.querySelectorAll(".option_select");
		optionSelected.forEach(function(ele, i){
			ele.addEventListener("click", function(e) {
				document.getElementsByName("search_param").value = this.getAttribute("data-value");
				document.getElementById("sorting_text").innerHTML = ele.textContent;
				dropdown.classList.remove("open");  
			})
		})
		document.querySelector(".bgr-transparent").addEventListener("click", function(e){
			dropdown.classList.remove("open");  
			this.style.display = "none";
		})
	}
	dropdownSelect();

	document.querySelectorAll("[data-close]").forEach(function (ele,i) {
		ele.querySelector(".close-button").addEventListener("click",function (e) {
			fadeOut(ele,"hidden");			
		});
	})
};

setTimeout(function(){
	main();
},1000);