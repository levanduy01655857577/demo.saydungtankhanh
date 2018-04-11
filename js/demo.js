window.addEvent('domready', function() {

	var giamdocSlide = new Fx.Slide('giamdoc_slide');
	giamdocSlide.hide();
	$('giamdoc_toggle').addEvent('click', function(e){
		e.stop();
		giamdocSlide.toggle();
	});
	
	var hcnsSlide = new Fx.Slide('hcns_slide');
	hcnsSlide.hide();
	$('hcns_toggle').addEvent('click', function(e){
		e.stop();
		hcnsSlide.toggle();
	});
	
	var tkSlide = new Fx.Slide('tk_slide');
	tkSlide.hide();
	$('tk_toggle').addEvent('click', function(e){
		e.stop();
		tkSlide.toggle();
	});
	
	
	var kinhdoanhSlide = new Fx.Slide('kinhdoanh_slide');
	kinhdoanhSlide.hide();
	$('kinhdoanh_toggle').addEvent('click', function(e){
		e.stop();
		kinhdoanhSlide.toggle();
	});
	
	var vattuSlide = new Fx.Slide('vattu_slide');
	vattuSlide.hide();
	$('vattu_toggle').addEvent('click', function(e){
		e.stop();
		vattuSlide.toggle();
	});
	
	var tcktSlide = new Fx.Slide('tckt_slide');
	tcktSlide.hide();
	$('tckt_toggle').addEvent('click', function(e){
		e.stop();
		tcktSlide.toggle();
	});
	
	var ptvSlide = new Fx.Slide('ptv_slide');
	ptvSlide.hide();
	$('ptv_toggle').addEvent('click', function(e){
		e.stop();
		ptvSlide.toggle();
	});
	
	var vphnSlide = new Fx.Slide('vphn_slide');
	vphnSlide.hide();
	$('vphn_toggle').addEvent('click', function(e){
		e.stop();
		vphnSlide.toggle();
	});
	
	var bksSlide = new Fx.Slide('bks_slide');
	bksSlide.hide();
	$('bks_toggle').addEvent('click', function(e){
		e.stop();
		bksSlide.toggle();
	});
	
	

});