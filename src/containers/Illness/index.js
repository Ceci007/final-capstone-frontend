import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormIllness from '../../components/FormIllness/FormIllness';
import {
  fetchUserIllness, createIll, deleteIll,
} from '../../actions/illness';
import { loginStatus } from '../../actions/user';
import './Illness.css';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      editForm: false,
      idIll: '0',
    };
  }

  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { illness } = this.props;
    const {
      addForm, editForm,
    } = this.state;
    return illness !== nextProps.illness
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm;
  }

  addIllness = (name, description) => {
    const { createIll, user } = this.props;
    const { addForm } = this.state;
    const userId = user.user.id;
    createIll({ name, description, userId });
    this.setState({
      addForm: !addForm,
    });
  };

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  displayEdit= e => {
    const { editForm } = this.state;
    this.setState({
      editForm: !editForm,
      idIll: e.target.id,
    });
  }

  deleteIll = id => {
    const { user } = this.props;
    const { deleteIll } = this.props;
    const userId = user.user.id;
    deleteIll({ userId, id });
  }

   changeEditForm = () => {
     const { editForm } = this.state;
     this.setState({
       editForm: !editForm,
     });
   }

   changeAddForm = () => {
     const { addForm } = this.state;
     this.setState({
       addForm: !addForm,
     });
   }

   render() {
     const { illness } = this.props;
     const {
       addForm, editForm, idIll,
     } = this.state;
     return (
       <main className="main">
         <button type="button" className="add-ill" onClick={this.displayForm}>+</button>
         <div className="illnesses">
           { !editForm && !addForm && <h3>Your Illnesses</h3>}

           {illness.length === 0 && !addForm && <div className="tracking">Start adding a illness you want to track here!</div>}
           {illness.map(ill => (
             <div key={ill.id}>
               { !editForm && !addForm && (
               <div className="one-ill">
                 <div className="buttons">
                   <button type="button" onClick={() => this.deleteIll(ill.id)}>
                     <i className="fa fa-trash-o" />
                   </button>
                   <button type="button" onClick={this.displayEdit}>
                     <i className="fa fa-pencil-square-o" id={ill.id} />
                   </button>
                 </div>
                 <div className="ill-info">
                   <Link to={{
                     pathname: `illness/${ill.id}`,
                     state: {
                       nameill: ill.name,
                     },
                   }}
                   >
                     {!editForm && (
                     <div>
                       <div className="ill-name">
                         <p>Name:</p>
                         <p>Description:</p>
                       </div>
                       <div className="ill-description">
                         <p>{ill.name}</p>
                         <p>{ill.description}</p>
                       </div>
                     </div>
                     )}
                   </Link>
                 </div>
               </div>
               )}
               { editForm && ill.id.toString() === idIll && <FormIllness actionToPerform="Save Changes" buttonId={idIll} changeEditForm={this.changeEditForm} />}
             </div>
           ))}
         </div>
         <div className="newill">
           {addForm && <FormIllness addIllness={this.addIllness} actionToPerform="Add" changeAddForm={this.changeAddForm} />}
         </div>
       </main>
     );
   }
}

const mapStateToProps = state => (
  {
    user: state.user,
    isLogin: state.user.isLogin,
    illness: state.illness,
  });
const mapDispatchToProps = dispatch => ({
  fetchUserIllness: data => dispatch(fetchUserIllness(data)),
  createIll: data => dispatch(createIll(data)),
  deleteIll: id => dispatch(deleteIll(id)),
  loginStatus: () => dispatch(loginStatus()),
});

Illness.propTypes = {
  fetchUserIllness: PropTypes.func,
  createIll: PropTypes.func,
  deleteIll: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  illness: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
};

Illness.defaultProps = {
  createIll: () => {},
  deleteIll: () => {},
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Illness);
