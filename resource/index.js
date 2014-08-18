var fnObj = {
	fontGroup:{
		"0":{name:"AXIcon", url:"http://axisj.com"},
		"1":{name:"Meteocons", url:"http://www.alessioatzeni.com/meteocons/"},
		"2":{name:"Font Awesome", url:"http://fortawesome.github.io/Font-Awesome/"},
		"3":{name:"ionicons", url:"http://ionicons.com/"},
		"4":{name:"Feather", url:"http://colebemis.com/feather/"}
	},
	/*
		{name:"AXIcon", url:"http://axisj.com"},
		{name:"AXIcon", url:"http://axisj.com"},
		{name:"Font Awesome", url:"http://fortawesome.github.io/Font-Awesome/"},
		{name:"Font Awesome", url:"http://fortawesome.github.io/Font-Awesome/"},
		{name:"ionicons", url:"http://ionicons.com/"},
		{name:"Feather", url:"http://colebemis.com/feather/"}
	],
	*/
	fonts:{},
	fonts_target:null,
	basket_target:null,
	search_input:null,
	basket: {},
	pageStart: function(){
		fnObj.fonts_target = axdom("#fonts-target");
		fnObj.basket_target = axdom("#basket-target");
		fnObj.search_input = axdom("#search-word");
		fnObj.jsonLoad(fnObj.printFont);
	},
	search: function(){
		fnObj.printFont(fnObj.search_input.val());
		return false;
	},
	likeFind: function(iconIndex){
		var searchtexts = fnObj.fonts.icons[iconIndex].properties.name.split(/\-/g);
		var vals = [];
		axf.each(searchtexts, function(){
			if(this.length > 1) vals.push(this);
		});
		fnObj.search_input.val( vals.join("|") );
		fnObj.printFont(fnObj.search_input.val());
	},
	reset: function(){
		fnObj.search_input.val("");
		fnObj.printFont("");
	},
	jsonLoad: function(onload){
		var url = "axicon/selection.json";
		var pars = "";
		new AXReq(url, {debug:false, method:"GET", pars:pars, onsucc:function(res){
			fnObj.fonts = res;
			if(onload) onload();
		},
			onerr:null
		});
	},
	printFont: function(se){
		var po = [];

		//trace(fnObj.fonts.icons.length);
		var groupName = "";
		for(var i=0;i<fnObj.fonts.icons.length;i++){
			var item;
			if(!axf.isEmpty(se)){
				item = fnObj.fonts.icons[i];
				if(item.properties.name.search(se) != -1 || (item.icon.tags||[]).join(",").search(se) != -1){

				}else{
					item = false;
				}
			}else{
				item = fnObj.fonts.icons[i];

			}
			if(item){
				if(groupName != fnObj.fontGroup[item.setIdx].name){
					groupName = fnObj.fontGroup[item.setIdx].name;
					po.push('<div class="fontGroupName">'+groupName + ' <a href="'+fnObj.fontGroup[item.setIdx].url+'" target="_blank">' + fnObj.fontGroup[item.setIdx].url +  '</a>' +'</div>');
				}
				po.push('<div class="font-item" id="axicon-index-' + i + '">');
					po.push('<i id="axicon-i-index-' + i + '" class="axi axi-'+ item.properties.name +'"></i>');
					po.push('<label class="letter-name" id="axicon-letter-index-' + i + '">' + item.properties.name + '</label>');
					po.push('<input type="hidden" id="axicon-inp-' + i + '" value="&#x' + item.properties.code.toString(16) + '" readonly="readonly" />');
				po.push('</div>');
			}
		}
		po.push('<div style="clear:both;"></div>');

		fnObj.fonts_target.empty();
		fnObj.fonts_target.append(po.join(''));

		if(axf.browser.name == "ie" && axf.browser.version < 8) {
			fnObj.fonts_target.find(".font-item").each(function () {
				var v = axdom(this).find("input").val();
				axdom(this).find("i.axi").html(v);
			});
		}

		fnObj.fonts_target.find(".font-item").bind("click", function(event){
			fnObj.onclickIcon(event.target.id);
		});
	},
	onclickIcon: function(clickId){
		var iconIndex = clickId.split(/\-/g).last();
		var basket = fnObj.basket;
		if(basket[iconIndex]){
			delete basket[iconIndex];
			axdom('#basket-index-' + iconIndex).remove();
		}else{
			var v = axdom("#axicon-inp-" + iconIndex).val();
			basket[iconIndex] = fnObj.fonts.icons[iconIndex];
			var po = [];
			po.push('<div class="font-item" id="basket-index-' + iconIndex + '">');

				po.push('<i id="basket-i-index-' + iconIndex + '" class="basketIcon axi"></i>');

				po.push('<label class="AXInputLabel"><input type="text" class="AXInput tag" value="<i class=&quot;axi axi-' + basket[iconIndex].properties.name + '&quot;&gt;</i&gt;" readonly="readonly" onclick="select();" /></label>');
				//po.push('<label class="AXInputLabel"><input type="text" class="AXInput tagie" value="" readonly="readonly" onclick="select();" /><span>iefix</span></label>');
				po.push('<label class="AXInputLabel"><input type="text" class="AXInput code" value="axi axi-' + basket[iconIndex].properties.name + '" readonly="readonly" onclick="select();" /></label>');

				po.push('<label class="AXInputLabel"><input type="text" class="AXInput unicode" value="&#x' + basket[iconIndex].properties.code.toString(16) + '" readonly="readonly" onclick="select();" /><span>Code</span>');
				po.push('</label>');
				po.push('<a class="remove-link" href="javascript:;" onclick="fnObj.onclickIcon(\'a-'+ iconIndex +'\');"><i class="axi axi-times-circle"></i></a>');
				po.push('<a class="likefind-link" href="javascript:;" onclick="fnObj.likeFind(' + iconIndex + ');"><i class="axi axi-search"></i></a>');

				po.push('<div class="font-item-expand">');
				po.push('<a class="basketIconExpand" href="javascript:;" onclick="fnObj.expandIcon(\'a-'+ iconIndex +'\');" id="basket-i-expand-' + iconIndex + '"><i class="axi axi-caret-down"></i></a>');
						po.push('<div class="examples"  id="basket-i-examples-' + iconIndex + '">');
						po.push('<label class="AXInputLabel">axi-span <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-spin"></i></label>');
						po.push('<label class="AXInputLabel">axi-rotate-90 <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-rotate-90"></i></label>');
						po.push('<label class="AXInputLabel">axi-rotate-90 <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-rotate-180"></i></label>');
						po.push('<label class="AXInputLabel">axi-rotate-90 <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-rotate-270"></i></label>');
						po.push('<label class="AXInputLabel">axi-badge <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-badge"><span>10</span></i></label>');
						po.push('<label class="AXInputLabel">axi-badge-border <i class="axi axi-' + basket[iconIndex].properties.name + ' axi-badge-border"><span>10</span></i></label>');
					po.push('</div>');

				po.push('</div>');

			po.push('</div>');
			fnObj.basket_target.prepend(po.join(''));

			axdom("#basket-i-index-" + iconIndex).html(v);
			axdom("#basket-index-" + iconIndex).find("input.tagie").val('<i class="axi">' + v + '</i>');
		}
	},
	expandIcon: function(clickId){
		var iconIndex = clickId.split(/\-/g).last();
		if(axdom("#basket-i-examples-" + iconIndex).data("on") == "on"){
			axdom("#basket-i-examples-" + iconIndex).data("on", "off");
			axdom("#basket-i-examples-" + iconIndex).hide();
			axdom("#basket-i-expand-" + iconIndex).html('<i class="axi axi-caret-down"></i>');
		}else{
			axdom("#basket-i-examples-" + iconIndex).data("on", "on");
			axdom("#basket-i-examples-" + iconIndex).show();
			axdom("#basket-i-expand-" + iconIndex).html('<i class="axi axi-caret-up"></i>');
		}


	}
};
axdom(document.body).ready(fnObj.pageStart);


/*
 function getUnicode(strs){
 var arrs = strs.split("");
 var po = [];
 for(var a=0;a<arrs.length;a++){
 po.push( "\\u" + arrs[a].charCodeAt(0).toString(16) );
 }
 return po.join('');
 }


 var h2 = "장기영AVav12\"'{,";

 console.log( getUnicode(h2) );
 */