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
	
	// Function to handle next image.
	function prepareNextImg(e, photo){
		var pathToImage = 'imgs/photos/' + photo;
		
		$.ajax({
			xhr: function(){
				
				// Thanks HTML5!
				var xhr = new window.XMLHttpRequest();
				
				// Download progress.
				xhr.addEventListener("progress", function(event){
					// Calculate % laoded.
					if(event.lengthComputable){
						var percenteLoaded = (event.loaded / event.total)*100;
						// Animate .preloader width.
						$('.preloader').css('width', percenteLoaded + '%');
						//console.log(percenteLoaded);
					}
				}, false);
				return xhr;
			},
			type: 'POST',
			url: pathToImage.replace('-', ''),
			data: {},
			beforeSend: function(data){
				// Apply loading image to div z-indexed below current image.
				$('.preloader-photo').css('background-image', 'url('+ pathToImage.replace('-', '') +')');
				$('.preloader-photo').css('opacity', '1');
			},
			success: function(data){
				// Fade current image to reveal new image.
				$('.photo').animate({
					opacity: 0
				}, 600, function(){
					$('.preloader-photo').css("z-index" , "150");
					$('.photo').css("opacity" , "1");
				}, 0, function(){
					$('.photo').css('background-image', 'url('+ pathToImage.replace('-', '') +')');
				});
				// Fade preloader afer success.
				fadePreloader();
				//console.log(pathToImage);
			}
				
		});
	}
	
	
	// Set up controls
	function controls(state, images){
		
		// Make sure they're enabled.
		if(state == 'enabled'){
			// Set index.
			countImages = images.length;
			index = 1;
			
			$('body').keydown(function(e){
				if(index < countImages || (e.keyCode || e.which) == 37){
					
					console.log(index);
					// Left.	
					if( (e.keyCode || e.which) == 37 ){
						prepareNextImg(e, images[index]);
						index--;
					}
					// Right.
					if( (e.keyCode || e.which) == 39 ){
						prepareNextImg(e, images[index]);
						index++;
					}
				
				}else if(index == countImages){
					console.log('ok');
					index = images.length -1;
					$('.preloader-photo, .photo').animate({
						left : '-3%'
					},75, function(){
						$('.preloader-photo, .photo').animate({
							left : '0%'
						});
					});
				}
			});

		}
	}
	
	
	
	
	
	// Toggle fading logo effect.
	var eventsBegun = false;
		
	// Contact Hover
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

	
	// Grab JSON image list.
	$.ajax({
		type: 'POST',
		url: 'functions/get_image.php',
		dataType: 'json',
		cache: false,
		success: function(result){
			var image_list = result;
			// Apply first result to container.
			$('.photo').css('background-image', 'url(imgs/photos/'+ result[0] +')');
			// Fade in container.
			$('.photo').animate({
				opacity: 1
			}, 1000);
			controls('enabled', image_list);
		}
	});
	
	


});