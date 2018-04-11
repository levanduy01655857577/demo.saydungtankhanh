Fx.Opacity = Fx.Style.extend({initialize: function(el, options){this.now = 1;this.parent(el, 'opacity', options);},toggle: function(){return (this.now > 0) ? this.start(1, 0) : this.start(0, 1);},show: function(){return this.set(1);}});

window.addEvent("load",function(){
	$$(".gk_is_wrapper").each(function(el){
		var elID = el.getProperty("id");
		var wrapper = $(elID);
		var $G = $Gavick[elID];
		var slides = [];
		var contents = [];
		var links = [];
		var play = false;
		var $blank = false;
		var loadedImages = ($E('.gk_is_preloader', wrapper)) ? false : true;
		var fxscr = new Fx.Scroll($E('.gk_is_thumbs', el), {duration: 650, transition: Fx.Transitions.Expo.easeOut});
		if(!loadedImages){
			var imagesToLoad = [];
			
			$ES('.gk_is_slide', wrapper).each(function(el,i){
				links.push(el.getFirst().getProperty('href'));
				var newImg = new Element('img',{
					"title":el.getProperty('title'),
					"class":el.getProperty('class'),
					"style":el.getProperty('style')
				});
				
				newImg.setProperty('alt',el.getChildren()[1].getProperty('href'));
				el.getChildren()[1].remove();
				newImg.setProperty("src",el.getChildren()[0].getProperty('href'));
				el.getChildren()[0].remove();
				imagesToLoad.push(newImg);
				newImg.injectAfter(el);
				el.remove();
			});
			
			var time = (function(){
				var process = 0;				
				imagesToLoad.each(function(el,i){ if(el.complete) process++; });
 				
				if(process == imagesToLoad.length){
					$clear(time);
					loadedImages = process;
					(function(){new Fx.Opacity($E('.gk_is_preloader', wrapper)).start(1,0);}).delay(200);
				}
			}).periodical(200);
		}
		
		var time_main = (function(){
			if(loadedImages){
				$clear(time_main);
				
				wrapper.getElementsBySelector(".gk_is_slide").each(function(elmt,i){
					slides[i] = elmt;
					if($G['slide_links']){
						elmt.addEvent("click", function(){window.location = elmt.getProperty('alt');});
						elmt.setStyle("cursor", "pointer");
					}
				});
				
				slides.each(function(el,i){ if(i != 0) el.setOpacity(0); });
				
				if($E(".gk_is_text",wrapper)){
					var text_block = $E(".gk_is_text_bg",wrapper);
					wrapper.getElementsBySelector(".gk_is_text_item").each(function(elmt,i){ contents[i] = elmt.innerHTML; });
				}
				
				$G['actual_slide'] = 0;
				if(wrapper.getElementsBySelector(".gk_is_text")[0]) wrapper.getElementsBySelector(".gk_is_text")[0].innerHTML = contents[0];
				
				if($G['autoanim']){
					play = true;
					$G['actual_animation'] = (function(){
						if(play && $blank == false){
							gk_is_style1_anim(wrapper, contents, slides, $G['actual_slide']+1, $G);
						}else $blank = false;
					}).periodical($G['anim_interval']+$G['anim_speed']);
				}
				
				if($E(".gk_is_next",wrapper)){
					var btnFx = [
						new Fx.Opacity($E(".gk_is_prev",wrapper),{duation:200}).set(0),
						new Fx.Opacity($E(".gk_is_next",wrapper),{duation:200}).set(0)					
					];
					$E(".gk_is_prev",wrapper).addEvent("click", function(){
						if($G['actual_slide'] > 0){
							gk_is_style1_anim(wrapper, contents, slides, $G['actual_slide']-1, $G);
						}else{
							gk_is_style1_anim(wrapper, contents, slides, slides.length-1, $G);
						}
						
						play = false;
						(function(){play = true;}).delay($G['anim_interval']);
					});
					$E(".gk_is_next",wrapper).addEvent("click", function(){
						if($G['actual_slide'] < slides.length-1){
							gk_is_style1_anim(wrapper, contents, slides, $G['actual_slide']+1, $G);
						}else{
							gk_is_style1_anim(wrapper, contents, slides, 0, $G);
						}
						
						play = false;
						(function(){play = true;}).delay($G['anim_interval']);
					});
					$E('.gk_is_image',wrapper).addEvent("mouseenter",function(){
						btnFx[0].start(1);btnFx[1].start(1);
					});
					$E('.gk_is_image',wrapper).addEvent("mouseleave",function(){
						btnFx[0].start(0);btnFx[1].start(0);
					});
				}
			}
		}).periodical(250);
	});
});

function gk_is_style1_text_anim(wrapper, contents, which, $G){
	var txt = $E(".gk_is_text",wrapper);
	new Fx.Opacity(txt,{duration: $G['anim_speed']/2}).start(1,0);
	(function(){
		new Fx.Opacity(txt,{duration: $G['anim_speed']/2}).start(0,1);
		txt.innerHTML = contents[which];
	}).delay($G['anim_speed']);
}

function gk_is_style1_anim(wrapper, contents, slides, which, $G){
	if(which != $G['actual_slide']){
		var max = slides.length-1;
		if(which > max) which = 0;
		if(which < 0) which = max;
		var actual = $G['actual_slide'];
		
		$G['actual_slide'] = which;
		slides[$G['actual_slide']].setStyle("z-index",max+1);
		new Fx.Opacity(slides[actual],{duration: $G['anim_speed']}).start(1,0);
		new Fx.Opacity(slides[which],{duration: $G['anim_speed']}).start(0,1);
		if($E(".gk_is_text",wrapper)) gk_is_style1_text_anim(wrapper, contents, which, $G);	
			
		switch($G['anim_type']){
			case 'opacity': break;
			case 'top': new Fx.Style(slides[which],'margin-top',{duration: $G['anim_speed']}).start((-1)*slides[which].getSize().size.y,0);break;
			case 'left': new Fx.Style(slides[which],'margin-left',{duration: $G['anim_speed']}).start((-1)*slides[which].getSize().size.x,0);break;
			case 'bottom': new Fx.Style(slides[which],'margin-top',{duration: $G['anim_speed']}).start(slides[which].getSize().size.y,0);break;
			case 'right': new Fx.Style(slides[which],'margin-left',{duration: $G['anim_speed']}).start(slides[which].getSize().size.x,0);break;
		}
				
		(function(){slides[$G['actual_slide']].setStyle("z-index",$G['actual_slide']);}).delay($G['anim_speed']);
	}
}