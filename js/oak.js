// Create gallery object.
var PhotoGallery = {

	// Initialize App.
	init: function(settings){
		// Tell the world.
		console.log('App Initiated');

		// Configure App.
		PhotoGallery.config = {
			// Where the images will be displayed.
			$photoPlaceHolder: $('.photo'),
			// Path to images.
			photoFolderPath: "imgs/photos/lowfi/",
			// Value will be updated.
			photosInDirectory: "0",
			// Start at photo...
			currentPhoto : 0,
			// The List of Photos
			photoList : ""
		},

		// Run method to grab image list.
		PhotoGallery.updatePhotoList();
	},

	updatePhotoList: function(result){
		$.ajax({
			type: 'POST',
			url: 'functions/get_image.php',
			dataType: 'json',
			cache: false,
			success: function(result){
				// Count photos and update app config value.
				PhotoGallery.config.photosInDirectory = result.length;
				// Update photo list.
				PhotoGallery.config.photoList = result;
				// Reload current photo incase order has changed.
				PhotoGallery.loadPhoto(PhotoGallery.config.currentPhoto);
				// return JSON list of all images in directory.
				return result;
			}
		});
	},

	updateCurrent: function(direction){
		if(direction == 'next'){
			if(PhotoGallery.config.currentPhoto == PhotoGallery.config.photosInDirectory - 1){
				PhotoGallery.config.currentPhoto = 0;
			}else{
				PhotoGallery.config.currentPhoto = PhotoGallery.config.currentPhoto + 1;
			}
		}
		if(direction == 'prev'){
			if(PhotoGallery.config.currentPhoto == 0){
				PhotoGallery.config.currentPhoto = 14;
			}else{
				PhotoGallery.config.currentPhoto = PhotoGallery.config.currentPhoto - 1;
			}
		}

		// Tell what photo we're on.
		console.log(PhotoGallery.config.currentPhoto);

		// Fade image out and load current photo.
		PhotoGallery.config.$photoPlaceHolder.fadeOut(100, function(){
			PhotoGallery.loadPhoto(PhotoGallery.config.currentPhoto);			
		});
	},

	// Method to load what ever image we want and to place it on the div.
	loadPhoto: function(current){

		// Current photo.
		var photo = PhotoGallery.config.photoList[current];

		// Grab current image name and build path.
		var pathToImage = PhotoGallery.config.photoFolderPath + photo;

		// Load the image.
		$.ajax({
			type: 'GET',
			url: pathToImage,
			data: {},
			cache: true,
			xhr: function(){
				// Create object to access data from server.
				var xhr = new window.XMLHttpRequest();
				// Download progress.
				xhr.addEventListener("progress", function(event){
					// When the length is being computed...
					if(event.lengthComputable){
						// Calculate % loaded.
						var percentLoaded = (event.loaded / event.total)*100;
						// Run preloader.
						PhotoGallery.preloader(percentLoaded, true);
						// Tell how much has loaded.
						console.log(percentLoaded);
					}
				},
				false);
				// when the request has completed show the image.
				xhr.addEventListener("load", function(){

					// Update background-image with current photo.
					PhotoGallery.config.$photoPlaceHolder.css('background-image', 'url('+pathToImage+')');

					// Hide preloader.
					PhotoGallery.preloader('0', false);

					// Fade in image.
					PhotoGallery.config.$photoPlaceHolder.fadeIn(750, function(){
						// Also set photo as background on body tag <body> to allow photos to cross fade.
						$('body').css('background-image', 'url('+pathToImage+')');
					});


				});
				return xhr;
			}
		});
	},


	// Method to update preloader status.
	preloader: function(w, display){
		// If we want to display it...
		if(display == true){
			$('.preloader').animate({
				opacity: '100'
			}, 0);
			$('.preloader').css('width', w + '%');
		}else if(display == false){
			$('.preloader').animate({
				opacity: '0'
			}, 0);
		}
	}

};

$(document).ready(function(){

	// Initialize application.
	PhotoGallery.init();

	// Previous photo button.
	$('.control-prev').click(function(){
		PhotoGallery.updateCurrent('prev');
	});

	// Next phoot button.
	$('.control-next').click(function(){
		PhotoGallery.updateCurrent('next');
	});

	// Register keys.
	$(document).keydown(function(e){
		console.log('ok');
		// Left arrow key.
		if(e.keyCode == 37){
			
			PhotoGallery.updateCurrent('prev');
			
			$('.control-prev').addClass('active');

			setTimeout(function () { 
				$('.control-prev').removeClass('active');
			}, 200);
		};
		// Right arrow key.
		if(e.keyCode == 39){
			PhotoGallery.updateCurrent('next');

			$('.control-next').addClass('active');

			setTimeout(function () { 
				$('.control-next').removeClass('active');
			}, 200);
		};
	});

});