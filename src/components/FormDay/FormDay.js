import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FormDay.css';
import { updateDay } from '../../actions/trackings';

class FormDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-06-01',
      temperature: 0,
      selectedOption: '🙂',
      medicine: ['', '', ''],
      symptons: [],
    };
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, trackings } = this.props;
    if (actionToPerform === 'Save Changes') {
      const track = trackings.filter(x => x.id.toString() === buttonId);
      this.setState({
        date: track[0].date,
        temperature: track[0].temperature,
        selectedOption: track[0].mood,
        medicine: track[0].medicines,
        symptons: track[0].symptons,
      });
    }
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

  handleChangeTemperature = e => {
    this.setState({
      temperature: e.target.value,
    });
  }

  handleOptionChange= e => {
    this.setState({
      selectedOption: e.target.value,
    });
  }

  handleChangeMedicine = (e, index1) => {
    const { medicine } = this.state;
    medicine[index1] = e.target.value;
    this.setState({ medicine });
  }

  handleChangeSymptons = (e, index) => {
    const { symptons } = this.state;
    symptons[index] = e.target.value;
    this.setState({ symptons });
  }

  handleEdit = async (id, illnessId) => {
    const {
      date, temperature, selectedOption, medicine, symptons,
    } = this.state;
    const {
      user, updateDay, changeEditForm,
    } = this.props;
    const data = {
      id,
      userId: user.user.id,
      illnessId,
      date,
      temperature,
      mood: selectedOption,
      medicines: medicine,
      symptons,
    };

    await updateDay(data);
    changeEditForm();
  }

  handleSubmit(mood, temperature, date, medicine, symptons) {
    const { addTracking, changeAddForm, user } = this.props;
    const userId = user.user.id;
    const medicines = medicine;
    addTracking(mood, temperature, date, medicines, symptons, userId);
    changeAddForm();
  }

  render() {
    const {
      temperature, date, selectedOption, medicine, symptons,
    } = this.state;
    const {
      actionToPerform, trackings, buttonId, changeAddForm, changeEditForm,
    } = this.props;
    const track = trackings.filter(x => x.id.toString() === buttonId);

    return (
      <div>
        <h3>
          {actionToPerform}
          {' '}
          Tracking for Illness
        </h3>
        <form className="day" onSubmit={() => this.handleSubmit}>

          <div className="form-div">
            <div className="date-temp">
              <div className="date-div">
                <label htmlFor="date">
                  Date:
                  <input
                    id="date"
                    type="date"
                    name="date"
                    defaultValue={buttonId === '0' ? date : track[0].date.slice(0, 10)}
                    onChange={this.handleChangeDate}
                  />
                </label>

              </div>
              <div className="temp-div">
                <label htmlFor="temp">
                  Temperature:
                  <input
                    id="temp"
                    type="number"
                    name="temp"
                    defaultValue={buttonId === '0' ? temperature : track[0].temperature}
                    onChange={this.handleChangeTemperature}
                  />
                </label>

                <span>°C</span>
              </div>
            </div>
            <div className="mood-div">
              <span>Mood: </span>
              <input type="radio" id="option1" name="mood" value="🙂" checked={selectedOption === '🙂'} onChange={this.handleOptionChange} />
              <span role="img" aria-label="happy">🙂</span>
              <input type="radio" id="option2" name="mood" value="😐" checked={selectedOption === '😐'} onChange={this.handleOptionChange} />
              <span role="img" aria-label="neutral">😐</span>
              <input type="radio" id="option3" name="mood" value="🙁" checked={selectedOption === '🙁'} onChange={this.handleOptionChange} />
              <span role="img" aria-label="sad">🙁</span>
              <input type="radio" id="option4" name="mood" value="😩" checked={selectedOption === '😩'} onChange={this.handleOptionChange} />
              <span role="img" aria-label="sad2">😩</span>
            </div>

            <div className="medicines2">
              <p>Medicines:</p>
              <div className="med-div">
                <input
                  id="med1"
                  type="text"
                  name="med1"
                  defaultValue={buttonId === '0' ? '' : track[0].medicines[0]}
                  placeholder="Add medicine"
                  onChange={e => this.handleChangeMedicine(e, 0, 0)}
                />
                <input
                  id="med2"
                  type="text"
                  name="med2"
                  defaultValue={buttonId === '0' ? '' : track[0].medicines[1]}
                  onChange={e => this.handleChangeMedicine(e, 1)}
                />
                <input
                  id="med3"
                  type="text"
                  name="med3"
                  defaultValue={buttonId === '0' ? '' : track[0].medicines[2]}
                  onChange={e => this.handleChangeMedicine(e, 2)}
                />
              </div>
            </div>
            <div className="symptons2">
              <p>Symptons:</p>
              <div className="med-div">
                <input
                  id="symp1"
                  type="text"
                  name="symp1"
                  placeholder="Add sympton"
                  defaultValue={buttonId === '0' ? '' : track[0].symptons[0]}
                  onChange={e => this.handleChangeSymptons(e, 0)}
                />

                <input
                  id="symp2"
                  type="text"
                  name="symp2"
                  defaultValue={buttonId === '0' ? '' : track[0].symptons[1]}
                  onChange={e => this.handleChangeSymptons(e, 1)}
                />

                <input
                  id="symp3"
                  type="text"
                  name="symp3"
                  defaultValue={buttonId === '0' ? '' : track[0].symptons[2]}
                  onChange={e => this.handleChangeSymptons(e, 2)}
                />
              </div>
            </div>
            <div className="buttons-form day-buttons">
              {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(selectedOption, temperature, date, medicine, symptons)}>{actionToPerform}</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(track[0].id, track[0].illnessId)}>Save</button>}
              {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
              {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

FormDay.propTypes = {
  addTracking: PropTypes.func,
  changeEditForm: PropTypes.func,
  changeAddForm: PropTypes.func,
  updateDay: PropTypes.func,
  buttonId: PropTypes.string,
  actionToPerform: PropTypes.string,
  trackings: PropTypes.instanceOf(Array),
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

FormDay.defaultProps = {
  changeAddForm: () => {},
  addTracking: () => {},
  updateDay: () => {},
  changeEditForm: () => {},
  actionToPerform: '',
  trackings: [],
  buttonId: '0',
  user: {},

};

const mapStateToProps = state => ({
  user: state.user,
  trackings: state.tracking,
});
const mapDispatchToProps = dispatch => ({
  updateDay: data => dispatch(updateDay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDay);
