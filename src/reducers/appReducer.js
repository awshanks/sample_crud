export default (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_PEOPLE': {
            return {
                people: action.payload.data,
                filteredPeople: action.payload.data,
                ...state,
            };
        }

        case 'UPDATE_PERSON': {
            //find index of person updated and set visible flag
            let index = state.people.findIndex(person => person.id === parseInt(action.payload.id, 10));

            if (index !== -1) {
                const people = JSON.parse(JSON.stringify(state.people));
                const filteredPeople = JSON.parse(JSON.stringify(state.filteredPeople));

                people[index].visible = action.payload.visible;

                if (filteredPeople) {
                    filteredPeople.filter(person => {
                        return person.id === people[index].id ? person.visible = action.payload.visible : person.visible;
                    })
                }

                return Object.assign({}, state, {
                    people,
                    filteredPeople,
                });
            }
            //do nothing
            return state;
        }

        case 'UPDATING_PERSON': {
            return Object.assign({}, state, {
                updatingPerson: action.payload,
            });
        }

        case 'LOADING_PEOPLE' : {
            return Object.assign({}, state, {
                loadingPeople: action.payload,
            });
        }

        case 'FILTER_PEOPLE' : {
            const people = JSON.parse(JSON.stringify(state.people));

            let filteredPeople = people.filter(person => {
                return person.name.includes(action.payload);
            });

            if(filteredPeople){
                return Object.assign({}, state, {
                    filteredPeople,
                });
            }
            else {
                return Object.assign({}, state, {
                    filteredPeople: state.people,
                });
            }
        }

        case 'DELETE_PERSON' : {
            //find index of person updated and set visible flag
            let index = state.people.findIndex(person => person.id === parseInt(action.payload, 10));
            let filteredIndex = state.filteredPeople.findIndex(person => person.id === parseInt(action.payload, 10));

            if (index !== -1) {
                const people = JSON.parse(JSON.stringify(state.people));
                const filteredPeople = JSON.parse(JSON.stringify(state.filteredPeople));
                const personId =  people[index];

                people.splice(index, 1);

                if(filteredIndex !== -1) {
                    filteredPeople.splice(index, 1);
                }

                return Object.assign({}, state, {
                    people,
                    filteredPeople,
                });
            }
            //do nothing
            return state;
        }

        default:
            return state
    }
};