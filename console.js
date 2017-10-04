var allConsoleElements;
var allBeepElements;
var mainstyle;

window.onload = function(){
	console.log("INIT");
	
	allConsoleElements = document.querySelectorAll("div[isConsole]");
	allBeepElements = document.querySelectorAll("audio[consoleBeep]");
	console.log(allConsoleElements);
	
	mainstyle = document.createElement("style");
	mainstyle.innerText += ".consoleMessage{verticalalign:bottom; padding:0px; margin:0px;}\n";
	document.head.appendChild(mainstyle);
	//document.style.insertRule("p.consoleMessage{verticalalign:bottom;}");
	
	for(var i = 0; i < allConsoleElements.length; i++){
		var e = allConsoleElements[i];
		var s = e.getAttribute('console-Script');
		var fc = e.getAttribute('console-Forecolor');
		var bc = e.getAttribute('console-Backcolor');
		var fs = e.getAttribute('console-FontSize');
		var f = e.getAttribute('console-Font');
		var l = e.getAttribute('console-Limit');
		
		var ns = eval(s);
		
		ns.init = ns.hasOwnProperty("init") ? ns.init : function(){ return 0; };
		var con = new Console(e, s, fc, bc, fs, f, l);
		switch (ns.init()){
			case 0: //Ready
				ns.main(con);
				break;
			case 1: //Abort
				con.WriteLine("Init aborted: Error 0x1");
				break;
			case 2: //Retry
				con.WriteLine("Init retry: Error 0x2");
				i--;
				break;
			default:
				con.WriteLine("Init failed to respond: Error 0x-1");
				console.log("Init must return a value to indicate its status, please refer to https://danhab99.github.io/ConsoleJS/ for more information");
				break;
		}
	}
};

function Console(element, name, forecolor, backcolor, fontsize, font, limit){
	forecolor = forecolor || "#ffffff";
	backcolor = backcolor || "#000000";
	fontsize = fontsize || 12;
	font = font || "Verdana";
	limit = limit || -1;
	
	element.style.backgroundColor = backcolor;
	element.style.overflow = "scroll";
	
	mainstyle.innerText += "p." + name + "{color:" + forecolor + "; fontsize:" + fontsize + "; font-family:" + font + ";}\n";
	mainstyle.innerText += "textarea." + name + "{color:" + forecolor + "; fontsize:" + fontsize + "; font-family:" + font + "; background-color:" + backcolor + "; resize: none; width:100%;}\n";
	
	var scope = this;
	var count = 0;
	
	this.WriteLine = function(message){
		var p = document.createElement("p");
		p.classList.add("consoleMessage");
		p.classList.add(name);
		p.setAttribute('index', count++);
		p.innerText = message;
		element.appendChild(p);
		element.scrollTop = element.scrollHeight;
		
		var selector = '[console-script="' + element.getAttribute('console-script') + '"] > p[index]';
		var cull = document.querySelectorAll(selector);
		for (var i = 0; i < cull.length; i++) {
			var index = cull[i].getAttribute('index');
			var cutoff = count - limit;
			
			if (cutoff < limit ? false : index < cutoff && limit > 0) {
				cull[i].remove();
			}
		}
	};
	this.ReadLine = function(callback){
		var p = document.createElement("textarea");
		p.rows = 1;
		p.width='100%';
		p.classList.add(name);
		p.classList.add("consoleMessage");
		var val;
		p.onkeydown =  function(e){
			//alert("Keypress " + e);
			if (!e) e = window.event;
			var keyCode = e.keyCode || e.which;
			if (keyCode == '13'){
			  // Enter pressed
			  val = p.value;
			  p.remove();
			  scope.WriteLine(val);
			  callback(val);
			  return false;
			}
		};
		element.appendChild(p);
	};
	this.Beep = function(e){
		if (allBeepElements.length < 0 || e === null) {
			beep();
			return;
		}
		
		for (var i = 0; i < allBeepElements.length; i++) {
			if (allBeepElements[i].id === e) {
				allBeepElements[i].load();
				allBeepElements[i].play();
			}
		}
	};
	this.Remove = function(i){
		i = i > 0 ? i : count + i;
		i = i === 0 ? i - 1 : i;
		document.querySelector('[console-script="' + element.getAttribute('console-script') + '"] > p[index="' + i + '"]').remove();
	};
	this.Ask = function(question, callback){
		this.WriteLine(question);
		this.ReadLine(callback);
	}
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

function beep() {
  (new
	Audio(
	"data:audio/wav;base64,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"
	)).play();
}
