import * as React from 'react';
import moment from 'moment';
import axios from 'axios';

import ListTwat from './list-twat';
import InlineLoadingSpinner from './inline-loading-spinner';
import './modal-twat.scss';

class ModalTwat extends React.Component {
  constructor() {
    super();
    this.state = {
      mainTwatLoading: true,
      repliesLoading: true,
      twat: null,
      replies: [],
    };
  }

  componentWillMount() {
    this.setState({ mainTwatLoading: true, repliesLoading: true, replies: [] });
    const { twatId } = this.props.match.params;
    axios.get(`/api/twats/${twatId}`)
      .then((res) => {
        this.setState({ mainTwatLoading: false, twat: res.data.twat });
      })
      .catch(err => console.error(`Error getting Twat info: ${err}`));
  }

  componentDidMount() {
    const { twatId } = this.props.match.params;
    axios.get(`/api/twats/replies/${twatId}`)
      .then((res) => {
        this.setState({ repliesLoading: false, replies: res.data });
      })
      .catch(err => console.error(`Error getting Twat info: ${err}`));
  }

  render() {
    if (this.state.mainTwatLoading) {
      return (
        <div className="modal-twat-content-wrapper">
          <div className="modal-twat-loading-spinner">
            <img src="/dist/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      );
    }

    const { twat } = this.state;
    return (
      <div className="modal-twat-content-wrapper">
        <div className="main-content-container">
          <div className="account-info">
            <div>
              <i className="material-icons user-icon">face</i>
              <div>
                <div className="display-name">{twat.user.displayName}</div>
                <div className="username">@{twat.user.username}</div>
              </div>
            </div>
            <div>
              <div className="follow-button">Follow</div>
              <i className="material-icons menu-button">expand_more</i>
            </div>
          </div>

          <div className="twat-content">
            {twat.twatText}
          </div>

          <div className="datetime">
            {moment(twat.timestamp).format('h:mma - D MMM YYYY')}
          </div>

          <div className="options-bar">
            <span><i className="material-icons">reply</i>{twat.replies.length}</span>
            <span><i className="material-icons">autorenew</i>{twat.meta.retwats}</span>
            <span><i className="material-icons">favorite_border</i>{twat.meta.likes}</span>
            <span><i className="material-icons">message</i></span>
          </div>
        </div>

        <div className="inline-reply-editor">
          <i className="material-icons user-icon">face</i>
          <input type="text" />
          <div className="twat-button">Twat</div>
        </div>

        {this.state.repliesLoading
          ? <InlineLoadingSpinner />
          : this.state.replies.map(reply => <ListTwat twat={reply} key={reply._id} />)}
      </div>
    );
  }
}

export default ModalTwat;
