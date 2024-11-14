
window.onload = function () {
    $(".login_join_div").show();

}
var username    = "demo" ;
var password    = "enablex";


document.getElementById('login_form').addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.querySelector('#nameText'), room = document.querySelector('#roomName'), errors = [];
    if (name.value.trim() === '') {
        errors.push('Enter your name.');
    }
    if (room.value.trim() === '') {
        errors.push('Enter your Room Id.')
    }


    if (errors.length > 0) {
        var mappederrors = errors.map(function (item) {
            return item + "</br>";
        });
        var allerrors = mappederrors.join('').toString();
        $.toast({
            heading: 'Error',
            text: allerrors,
            showHideTransition: 'fade',
            icon: 'error',
            position: 'top-right',
            showHideTransition: 'slide'
        });

        return false;
    }


    joinRoom(document.getElementById('roomName').value, function (data) {

        if (!jQuery.isEmptyObject(data)) {

            var user_ref = document.getElementById('nameText').value;
            var usertype = undefined;
            if (document.getElementById('moderator').checked) {
                usertype = document.getElementById('moderator').value;
            }
            if (document.getElementById('participant').checked) {
                usertype = document.getElementById('participant').value;
            }

            window.location.href = "confo.html?roomId=" + data.room_id + "&usertype="+usertype+"&user_ref=" + user_ref;
        } else {
            alert('No room found');
        }
    });
});

var loadingElem = document.querySelector('.loading');
document.getElementById('create_room').addEventListener('click', function (event) {
    loadingElem.classList.add('yes');
    createRoomMulti(function (result) {
        document.getElementById("roomName").value = result;
        document.getElementById("create_room_div").style.display = "none";
        document.getElementById("message").innerHTML = "Hãy chia se RoomID cho moi nguoi cung tham gia ";

    });
});

var createRoomMulti = function (callback) {
	var apiUrl = '/api/room/multi/';
	if (typeof baseUrl !== 'undefined') {
		apiUrl = baseUrl + apiUrl;
	}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response =  JSON.parse(this.responseText);
            if(response.error){
                $.toast({
                    heading: 'Error',
                    text: response.error,
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });

            }
            else {
                callback(response.room.room_id);
                loadingElem.classList.remove('yes');
            }
        }
    };
    xhttp.open("POST", apiUrl, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    xhttp.send();
};


