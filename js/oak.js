$(function(){
	
	// Fade in animation.
	function fadeItIn(){
		$('.contact').animate({
			opacity: 1,
			marginRight: '0px'
		}, 100, function(){
			eventsBegun = true;
		});
	}
	
	// Fade out animation.
	function fadeItOut(){
		$('.contact').animate({
			opacity: 0
		}, 2000);	
	}
	
	// Time out mouse.
	function waitToFade(){
		setTimeout(function(){
			fadeItOut();
		}, 2000)
	}
	
	// Fade Preloader
	function fadePreloader(){
		$('.preloader').delay(750).animate({
			opacity: 0
		}, 150);
	}
	
	// Function to change number.
	function manipulateNumber(number, direction, amount){
		if(amount == null){
			amount = 1;
		}
		if(direction == 'subtract'){
			number = number - parseInt(amout);
			console.log(number);
			return number;
		}else if(direction == 'add'){
			number = number + parseInt(amount);
			console.log(number);
			return number;			
		}
	}
	
	manipulateNumber(3, 'add', '4'); // 7
	manipulateNumber(3, 'subtract', '2'); // 1
	
	// Toggle fading logo effect.
	var eventsBegun = false;
		
	// Start events.
	$('.decoration').hover(function(){
		fadeItIn();
		waitToFade();
	});
	
	// Reset fadeout.
	$('.decoration').mousemove(function(){
		if(eventsBegun = true){
			$('.contact').stop();
			fadeItIn();
		}
	});
	
	
	// Images
	var pathToImage = 'imgs/photos/12.jpg';
	
	var imgPath = [
		'01.jpg',
		'02.jpg',
		'03.jpg',
		'04.jpg',
		'05.jpg',
		'06.jpg',
		'07.jpg',
		'08.jpg',
		'09.jpg',
		'10.jpg',
		'11.jpg',
		'12.jpg',
		'13.jpg',
		'14.jpg'
	];
	
	// Grab image.
	$.ajax({
		xhr: function(){
			
			var xhr = new window.XMLHttpRequest();
			
			// Download progress.
			xhr.addEventListener("progress", function(event){
				// Calculate % laoded.
				if(event.lengthComputable){
					var percenteLoaded = (event.loaded / event.total)*100;
					$('.preloader').css('width', percenteLoaded + '%');
					console.log(percenteLoaded);
				}
			}, false);
			return xhr;
		},
		type: 'POST',
		url: pathToImage,
		data: {},
		beforeSend: function(data){
			$('.preloader-photo').css('background-image', 'url('+ pathToImage +')');
		},
		success: function(data){
			$('.photo').animate({
				opacity: 0
			}, 600);
			fadePreloader();
		}
			
	});

});