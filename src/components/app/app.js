import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    deletePerson,
    filterPeople,
    getPeople,
    loadingPeople,
    updatePersonVisible,
    updatingPerson
} from "../../actions/appActions";
import {withRouter} from "react-router-dom";

export class Index extends Component {

    constructor(props) {
        super(props);

        //bind functions from events to context
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleFilterPeople = this.handleFilterPeople.bind(this);
        this.handleDeletePerson = this.handleDeletePerson.bind(this);
    };

    handleVisibleChange(event, id) {
        this.props.updatePersonVisible({visible: event.target.checked, id: id})
    };

    handleDeletePerson(event, id) {
        this.props.deletePerson(id);
    };

    displayPeopleList() {
        if (this.props.filteredPeople) {
            const peopleList = this.props.filteredPeople.map((person) =>
                <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>{person.balance}</td>
                    <td>{person.email}</td>
                    <td>{person.address}</td>
                    <td>
                        <input
                            name="visible"
                            type="checkbox"
                            checked={person.visible}
                            onChange={(event) => {
                                this.handleVisibleChange(event, person.id)
                            }}/>
                    </td>
                    <td>
                        <button onClick={(event) => {
                            this.handleDeletePerson(event, person.id)
                        }}>Delete
                        </button>
                    </td>
                </tr>
            );

            return (
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Balance</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Visible</th>
                    </tr>
                    {peopleList}
                </table>
            );
        } else {
            return "No people to show, please add a person to view the list";
        }
    };

    handleFilterPeople(event) {
        const searchString = event.target.value;

        this.props.filterPeople(searchString);
    }

    componentDidMount() {
        try {
            this.props.getPeople();
        } catch (ex) {
            console.log("error getting people", ex);
        }
    }

    render() {
        return (
            <div>
                {this.props.loadingPeopleFlag && <div id="loadingPeople">Loading People...</div>}
                {this.props.updatingPersonFlag && <div id="updatingPerson">Updating Person...</div>}
                <h1>People List</h1>
                <br/>
                <br/>
                <h2>Search</h2>
                <input type="search" id="people-search" onChange={this.handleFilterPeople} minLength={2}/>
                <br/>
                <br/>
                {this.displayPeopleList()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingPeopleFlag: state.loadingPeople,
        updatingPersonFlag: state.updatingPerson,

        people: state.people,
        filteredPeople: state.filteredPeople,
    };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
    getPeople,
    updatePersonVisible,
    updatingPerson,
    loadingPeople,
    filterPeople,
    deletePerson,
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index));