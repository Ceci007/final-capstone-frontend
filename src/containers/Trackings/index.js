import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchIllnessDays, createDay, deleteDay } from '../../actions/trackings';
import { loginStatus } from '../../actions/user';
import FormDay from '../../components/FormDay/FormDay';
import './Trackings.css';

class Trackings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
      addEdit: false,
      buttonId: '0',
      addMore: false,
    };
  }

  componentDidMount() {
    const {
      user, fetchIllnessDays,
    } = this.props;

    const { ID } = this.state;
    const userID = user.user.id;

    fetchIllnessDays(userID, ID);
  }

  createDate = date => {
    const dateFormat = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateFormat.toUTCString(undefined, options);
  }

  displayInfo = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  addTracking = (mood, temperature, date, medicines, symptons, userId) => {
    const { ID } = this.state;
    const { createDay } = this.props;
    const illnessId = ID;
    createDay({
      illnessId, mood, temperature, date, medicines, symptons, userId,
    });
  }

  deleteTracking = id => {
    const { ID } = this.state;
    const { deleteDay, user } = this.props;
    const userId = user.user.id;
    const illnessId = ID;
    deleteDay({ illnessId, id, userId });
  }

  changeEditForm = () => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
    });
  }

  changeAddForm = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  displayMore = e => {
    const { addMore } = this.state;
    this.setState({
      addMore: !addMore,
      buttonId: e.target.id,
    });
  }

  displayTracking = () => {
    const { location } = this.props;
    const { state } = location;
    if (state) {
      const { nameill } = state;
      return nameill;
    }
    const { history } = this.props;
    history.push('/main');
    return null;
  }

  render() {
    const { addEdit, buttonId, addMore } = this.state;
    const { trackings, addForm } = this.props;

    const name = this.displayTracking();

    return (
      <div className="trackings">
        <div className="trackings-buttons">
          <button type="button" className="go-back" onClick={this.displayInfo}>
            <Link to="/main">
              <i className="fa fa-arrow-left" aria-hidden="true" />
            </Link>
          </button>
          <button type="button" className="add-day" onClick={this.displayInfo}>+</button>
        </div>
        {!addEdit && !addForm && (
        <h3>
          Tracking of Illness:
          {name && <span>{name}</span>}
        </h3>
        )}
        {trackings.map(day => (
          <div key={day.id}>
            {!addEdit && !addForm && (
              <div>
                <div className="day">
                  <div className="date">

                    <p>
                      {' '}
                      <i className="fa fa-calendar" aria-hidden="true" />
                      {this.createDate(day.date).slice(0, 16)}
                    </p>
                    <div>
                      <button type="button" onClick={() => this.deleteTracking(day.id)}>
                        <i className="fa fa-trash-o" />
                      </button>
                      <button type="button" onClick={this.displayEdit}><i className="fa fa-pencil-square-o" aria-label="pencil" id={day.id} /></button>
                    </div>
                  </div>
                  <div className="mood">
                    <p>
                      Mood:
                    </p>
                    <p>{day.mood}</p>
                  </div>
                  <div className="temp">
                    <p>
                      Temperature:
                    </p>
                    <p>
                      <i className="fa fa-thermometer-empty" />
                      {day.temperature}
                      ° C
                    </p>
                  </div>

                  <button type="button" onClick={this.displayMore} id={day.id} className="more">▼</button>
                  {addMore && buttonId === day.id.toString() && (
                  <div className="meds-symp">
                    <ul className="medicines">
                      {day.medicines && <p>Medicines:</p>}
                      <div className="med-list">
                        {day.medicines && day.medicines.map(x => (
                          x !== '' ? (
                            <li key={x}>
                              <span role="img" aria-label="pill">💊</span>
                              {x}
                            </li>
                          ) : null
                        ))}
                      </div>
                    </ul>
                    <ul className="symptons">
                      {day.symptons && <p>Symptons:</p>}
                      <div className="symp-list">
                        {day.symptons && day.symptons.map(x => (
                          x !== '' ? <li key={x}>{x}</li> : null))}
                      </div>
                    </ul>
                  </div>
                  )}
                </div>
              </div>
            )}
            {addEdit && buttonId === day.id.toString() && (
            <FormDay
              actionToPerform="Save Changes"
              buttonId={buttonId}
              changeEditForm={this.changeEditForm}
            />
            )}
          </div>
        ))}
        {addForm && <FormDay actionToPerform="Add" addTracking={this.addTracking} changeAddForm={this.changeAddForm} /> }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = dispatch => ({
  fetchIllnessDays: (datauser, dataillness) => dispatch(fetchIllnessDays(datauser, dataillness)),
  loginStatus: () => dispatch(loginStatus()),
  createDay: data => dispatch(createDay(data)),
  deleteDay: (id, id2) => dispatch(deleteDay(id, id2)),
});

Trackings.propTypes = {
  addForm: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchIllnessDays: PropTypes.func,
  deleteDay: PropTypes.func,
  createDay: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  trackings: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
  location: PropTypes.shape({
    state: PropTypes.shape({ nameill: PropTypes.string }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  displayForm: PropTypes.func,

};

Trackings.defaultProps = {
  addForm: false,
  fetchIllnessDays: () => {},
  deleteDay: () => {},
  createDay: () => {},
  displayForm: () => {},
  user: {},
  trackings: [],
  location: {},
  history: {},
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trackings));
