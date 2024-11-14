
var createToken = function (details, callback) {
	var apiUrl = '/api/create-token/';
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
                    position: 'top-right',
                    showHideTransition: 'slide'
                });
            }
            else {
                callback(response.token);
            }
        }
    };
    xhttp.open("POST", apiUrl, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(details));
};
