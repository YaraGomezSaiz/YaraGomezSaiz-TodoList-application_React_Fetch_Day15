//FUNCTION FETCH

    function fetch(url, method, body) {

        let fetch_parameter = {
            method: method,
            body: JSON.stringify({
                id: body.id,
                title: body.title,
                body: "",
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        fetch_parameter.method = method;
        if (body === null) {
            fetch_parameter = {
                method: method,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
        };

        fetch(url, fetch_parameter)
            .then(response => response.json())
            .then(responseJson => {
               
            });
    }