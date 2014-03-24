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
					PhotoGallery.config.$photoPlaceHolder.fadeIn(1000);
				});
				return xhr;
			}
		});
	},


	// Method to update preloader status.
	preloader: function(width, display){
		// If we want to display it...
		if(display == true){
			$('.preloader').css('display', 'block');
			$('.preloader').css('width', width + '%');
		}else if(display == false){
			$('.preloader').css('display', 'none');
		}
	},

	// Method to animate photo position.
	animatePhoto: function(){

	}

};

$(document).ready(function(){

	// Initialize application.
	PhotoGallery.init();

	$('#nextPhoto').click(function(){
		PhotoGallery.updateCurrent('next');
	});

	$('#prevPhoto').click(function(){
		PhotoGallery.updateCurrent('prev');
	});

	$('#getSomething').click(function(){
		PhotoGallery.loadPhoto(PhotoGallery.config.currentPhoto);
	});


});