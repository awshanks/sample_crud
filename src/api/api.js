import axios from 'axios';

//get the server url from env
const getUrl = () => {
    return process.env.API_URL;
};

export const getPeople = () => {

    return axios.get(getUrl() + '/app/people')
        .then(response => {
                return response;
            }
        )
        .catch(function (error) {
            console.log(error);
        });
};

export const deletePerson = (payload) => {
    return axios.delete( getUrl() + '/app/people/' + payload)
        .then(response => {
                return response;
            }
        )
        .catch(function (error) {
            console.log(error);
        });
};

export const updatePersonVisible = (payload) => {
    return axios.put( getUrl() + '/app/people/' + payload.id, {visible: payload.visible})
        .then(response => {
                return response;
            }
        )
        .catch(function (error) {
            console.log(error);
        });
};


//todo unused, add a new component to allow a new person to be added via the UI
export const createPerson = (payload) => {
    return axios.post(getUrl() + '/app/people', payload)
        .then(response => {
                return response;
            }
        )
        .catch(function (error) {
            console.log(error);
        });
};