import React, { Component, PropTypes } from 'react'
import Transaction from './transaction';
import Modal from './Modal';
import {
  addTransaction,
  createTransaction,
  fetchTransactions,
  fetchUser,
  openModal,
  closeModal,
} from '../actionsCreators';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: "", to: ""};
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchTransactions();
  }

  amountChanged(event) {
    this.setState({amount: event.target.value});
  }

  toChanged(event) {
    this.setState({to: event.target.value});
  }

  createTransaction(e){
    let amount = parseFloat(this.state.amount) * 10000;
    let to = this.state.to;

    e.preventDefault()
    fetch(`/api/users/${to}`)
      .then(response => response.json())
      .then(json => {
        let transaction = {}
        transaction.to_public_key = json.public_key
        transaction.to_address=`${to}$mason.money`
        transaction.from_public_key = this.props.user.public_key
        transaction.from_address = `${this.props.user.username}$mason.money`
        transaction.amount = amount;
        this.props.closeModal('pay')
        this.props.createTransaction(transaction)
      })
    this.setState({amount:"", to:""})
  }

  render() {
    let transactions = [];
    this.props.transactions.forEach((transaction, index) => {
    transactions.push(<Transaction key={transaction.id} amount={transaction.amount/10000} to={transaction.to_address} from={transaction.from_address}  />)
    })
    return (
    <div>
      <button onClick={(e) => this.props.openModal("pay")}>
        Send Money
      </button>
      <ol className="transactions">
        {transactions}
      </ol>
      <Modal title="Send Money" id="pay">
        <form onSubmit={this.createTransaction.bind(this)} >
          <label>Pay to:</label>
          <input  placeholder="Username, etc..." value={this.state.to} onChange={this.toChanged.bind(this)} />
          <span>Username, @twitter_handle, Email, Phone or Mason Money Address</span>
          <br />
          <label>Amount</label>
          <input  placeholder="0.00" value={this.state.amount} onChange={this.amountChanged.bind(this)} />
          <button onClick={this.createTransaction.bind(this)}>
            Send
          </button>
        </form>
     </Modal>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    addTransaction: (params) => dispatch(addTransaction(params)),
    createTransaction: (params) => dispatch(createTransaction(params)),
    openModal: (params) => dispatch(openModal(params)),
    closeModal: (params) => dispatch(closeModal(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
