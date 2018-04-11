function offsetLeft(el)
  {
    x = el.offsetLeft
    for (e = el.offsetParent; e; e = e.offsetParent)
      x += e.offsetLeft;
    return x
  } 

 function offsetTop(el)
  {
    y = el.offsetTop
    for (e = el.offsetParent; e; e = e.offsetParent)
      y += e.offsetTop;
    return y
 } 
  


function easyscroll(scroller, scroll_type, scroll_speed){
		this.MarqueeUp = function(){
			if((this.scroll_2_offsetTop - this.scroller.scrollTop) <=0){	
				this.scroller.scrollTop -= this.scroll_1.offsetHeight;
				//$('bbb').innerHTML="kv a";
			}else{	
				this.scroller.scrollTop ++ ;
				//$('bbb').innerHTML="kv b";
			}
		}.bindWithEvent(this);
		
		this.MarqueeRight = function(){
			//alert(this.scroll_1.offsetLeft);
			//$('aaa').innerHTML= this.scroll_2_offsetLeft + " va " +this.scroller.scrollLeft ; 
			if((this.scroll_2_offsetLeft - this.scroller.scrollLeft) <= 0){	
				this.scroller.scrollLeft -= this.scroll_1.offsetWidth; //alert('ok');
				//$('bbb').innerHTML="kv a";
			}else{	
				this.scroller.scrollLeft ++ ;
				//$('bbb').innerHTML="kv b";
			}
		}.bindWithEvent(this);
		
		this.scroller 	= $(scroller);
		temp = this.scroller.innerHTML;
		this.scroller.innerHTML="";
		if(scroll_type==1){
			this.scroll_1 =  new Element('div',{'id':'scroll_content'}).inject(this.scroller);
			this.scroll_2 =  new Element('div',{'id':'scroll_content2'}).inject(this.scroller);
			//new Element('div',{'styles':{'clear':'both'}}).inject(this.scroller);
			this.Marquee =  this.MarqueeUp;
		}
		else if(scroll_type==2){
			table =  new Element('table',{'id':'table_content'}).inject(this.scroller);
			tb = new Element("tbody").inject(table); 
			tr= new Element('tr',{'id':'tr_content'}).inject(tb);
			this.scroll_1 =  new Element('td',{'id':'scroll_content'}).inject(tr);
			this.scroll_2 =  new Element('td',{'id':'scroll_content2'}).inject(tr);
			this.Marquee =  this.MarqueeRight;
		}	
		this.scroll_1.innerHTML = temp;
		this.scroll_2.innerHTML = this.scroll_1.innerHTML;
		this.scroll_2_offsetTop =  offsetTop(this.scroll_2) - offsetTop(this.scroller);
		this.scroll_2_offsetLeft =  offsetLeft(this.scroll_2) - offsetLeft(this.scroller);

		this.speed 		= scroll_speed;
		
				
		this.scroller.addEvent('mouseout',function(e){
			clearInterval(this.MyMar) ; this.MyMar = null; this.MyMar = setInterval(this.Marquee, this.speed);
		}.bindWithEvent(this));
		
		
		this.scroller.addEvent('mouseover',function(e){
			clearInterval(this.MyMar) ; 
		}.bindWithEvent(this));
		
		
		this.MyMar = setInterval(this.Marquee, this.speed);
	}

	function opensel(objId)
	{
	
		$(objId+"_list").style.display="block";
		//alert($(objId).offsetLeft);
		$(objId+"_list").style.left =offsetLeft($(objId))+'px';
		
	}
	
	function closesel(objId,objval,exprice)
	{
		document.getElementById(objId+"_list").style.display="none";
		document.getElementById(objId+"_price").innerHTML=exprice;
		document.getElementById(objId).innerHTML=objval;
	}
	
	function getArea4City( town_id )
	{
		 var request = new Request.JSON({
			'method' : 'post',
			'url' : 'index.php?option=com_jea&task=getArea4City',
			'data' : {
			'town_id' : town_id
			},
			'onRequest':function()
			{ 
				$('area_id').disabled = "disabled";
			
			},
			'onComplete':function(responseObject)
			{
				if(responseObject)
				{	
					if ( responseObject.result)
					{
						$('area_id').disabled="";
						removecombox($('area_id'));
						addtocombox($('area_id'),responseObject.arealist);
					}
					else
					{
						$('loading').innerHTML = "Chưa nhận đuợc đối tuợng!";
					}
				}
				else
				{
					$('loading').innerHTML = '<u>lỗi truy vấn</u>';
				}	
			},
			'onFailure':function(req){ $('loading').innerHTML = '<u>lỗi truy vấn</u>'; }
		 });
		request.send();
		$('area_id').options[0].text="   Loading ...";
	}
	
	function addtocombox(obj,arealist){
		var isNav = navigator.appName == "Netscape";
		e=document.createElement("OPTION");

		e.value="";
		e.text="-----Xem tất cả-----";

		if(isNav) { //Firefox
			obj.appendChild(e);	
		} else {
			obj.add(e);	
		}		
		 for ( i = 0; i < arealist.length; i++ ) {
				e=document.createElement("OPTION");
				e.value=arealist[i].id;
				e.text=arealist[i].name;
				
				if(isNav) { //Firefox
					obj.appendChild(e);	
				} else {
					obj.add(e);	
				}
		 }
	
	}
	
	function removecombox(obj){
			n=obj.options.length
			for( i=0;i<n;i++){
				obj.remove(0);
			}
	}

	