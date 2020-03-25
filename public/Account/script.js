var theImageForm = document.querySelector('#theImageForm');
var theImageField = document.querySelector('#theImageField');
var theImageContainer = document.querySelector('#theImageContainer');
var theErrorMessage = document.querySelector('#errorMessage');
var theSuccessMessage = document.querySelector('#successMessage');
var theClearImageLink = document.querySelector('#clearImage');
var theOpenButton = document.querySelector('#buttonContainer');
let name = $('#my_name');
let image = $('#user');

$(function(){
    $.get('/root/get/name',(data)=>{
        name.html(`<h1>${data}</h1>`);
    })
    $.get('/root/get/profile_picture', (data)=>{
        image.attr('src', `../uploads/${data}`);
    })
})

var i = 0;

function myFunction(){
	if (i > 2){
		i = 1;
	}
	if (theOpenButton.style.display === "none" && i == 1) {
		theOpenButton.style.display = "grid";
	} else {
		i = 0;
		theOpenButton.style.display = "none";
	}
}

$(document).mouseup(function(e){
	var container = $("#buttonContainer");
    if(!container.is(e.target)){
		i++;
        container.hide();
	}
});

theImageField.onchange = function (e) {
    var theFile = e.target.files[0];

    if(customFileFilter(theFile)) {
        handleUploadedFile(theFile);
    }

}

function customFileFilter(file){
    const regex= /\jpg$|\jpeg$|\png$|\gif$/

    const check_filename = regex.test(file.name);

    const check_mimetype= regex.test(file.type);

    if (file.size > 500000) {
        theErrorMessage.classList.add('hide');
        theErrorMessage.innerHTML = "File too large, cannot be more than 500KB...";
        theErrorMessage.classList.remove('hide');
        return false;
    }

    if(check_filename && check_mimetype){
        return true;
    } else {
        theErrorMessage.classList.add('hide');
        theErrorMessage.innerHTML = "File type should be png or jpg/jpeg...";
        theErrorMessage.classList.remove('hide');
        return false;
    }
}

function handleUploadedFile(file) {
    fileName = file.name;
    clearImage();
    var img = document.createElement("img");
    img.setAttribute('id', 'theImageTag');
    img.file = file;
    theImageContainer.appendChild(img);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}

function clearImage(e) {
    if(e) {
        e.preventDefault();
    }

    var theImageTag = document.querySelector('#theImageTag');

    if(theImageTag) {
        theImageContainer.removeChild(theImageTag);
        theImageField.value = null;
    }

    theErrorMessage.classList.add('hide');
    theSuccessMessage.classList.add('hide');
}

$(document).ready(function(){
    let prev_flag = $('#pi');

    $('#theImageForm').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
            status('Error: ' + xhr.status);
            },

            success: function(res) {
                if(res !== "undefined"){
                    theSuccessMessage.classList.add('hide');
                    theSuccessMessage.innerHTML = "Image uploaded successfully";
                    theSuccessMessage.classList.remove('hide');
                }
                else{
                    theErrorMessage.classList.add('hide');
                    theErrorMessage.innerHTML = "Select a File to Upload...";
                    theErrorMessage.classList.remove('hide');
                }
            }
        });
        return false;
    });

    $(".head").click(function(){
        prev_flag.toggleClass('active');
        prev_flag = $(this);
        prev_flag.toggleClass('active');
        if($('#pi').hasClass('active')){
            $("#personal").css({'margin-left': '0'});
            $("#change").css({'margin-left': '120%'});
        }
        else{
            $("#personal").css({'margin-left': '-100%'});
            $("#change").css({'margin-left': '0%'});
        }
    });
});