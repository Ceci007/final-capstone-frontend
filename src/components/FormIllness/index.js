import React from 'react';
import PropTypes from 'prop-types';
import './FormIllness.css';
import { connect } from 'react-redux';
import { updateIll } from '../../actions/illness';

class FormIllness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, illness } = this.props;
    if (actionToPerform === 'Save Changes') {
      const ill = illness.filter(x => x.id.toString() === buttonId);
      this.setState({
        name: ill[0].name,
        description: ill[0].description,
      });
    }
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeDescription = e => {
    this.setState({
      description: e.target.value,
    });
  }

  handleSubmit = (name, description) => {
    const { addIllness } = this.props;
    addIllness(name, description);
  }

  handleUpdate = async id => {
    const { name, description } = this.state;

    const {
      user, updateIll, changeEditForm,
    } = this.props;

    const data = {
      id,
      user_id: user.user.id,
      name,
      description,
    };

    await updateIll(data);
    changeEditForm();
  }

  render() {
    const { name, description } = this.state;
    const {
      actionToPerform, illness, buttonId, changeEditForm, changeAddForm,
    } = this.props;
    const ill = illness.filter(x => x.id.toString() === buttonId);
    return (
      <div>
        <h3>
          {actionToPerform}
          {' '}
          Illness
        </h3>
        <form
          className="one-form"
          onSubmit={
           actionToPerform === 'Add'
             ? () => this.handleSubmit(name, description) : () => this.handleUpdate(ill[0].id)
}
        >
          <div className="one-parameter">
            <label htmlFor="name">
              Name:
              <input
                required
                id="name"
                type="text"
                name="name"
                defaultValue={buttonId === '0' ? name : ill[0].name}
                onChange={this.handleChangeName}
              />
            </label>
          </div>
          <div className="one-parameter">
            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                name="description"
                defaultValue={buttonId === '0' ? description : ill[0].description}
                onChange={this.handleChangeDescription}
              />
            </label>

          </div>
          <div className="buttons-form">
            {actionToPerform === 'Add' && <button type="submit">{actionToPerform}</button>}
            {actionToPerform === 'Save Changes' && <button type="submit">Save</button>}
            {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
            {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
          </div>
        </form>
      </div>
    );
  }
}

FormIllness.propTypes = {
  addIllness: PropTypes.func,
  actionToPerform: PropTypes.string,
  changeAddForm: PropTypes.func,
  illness: PropTypes.instanceOf(Array),
  buttonId: PropTypes.string,
  updateIll: PropTypes.func,
  changeEditForm: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

};

FormIllness.defaultProps = {
  changeAddForm: () => {},
  addIllness: () => {},
  actionToPerform: '',
  illness: [],
  buttonId: '0',
  updateIll: () => {},
  changeEditForm: () => {},
  user: {},
};

const mapStateToProps = state => ({
  user: state.user,
  illness: state.illness,
});
const mapDispatchToProps = dispatch => ({
  updateIll: data => dispatch(updateIll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormIllness);
