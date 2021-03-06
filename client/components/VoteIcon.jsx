var React = require('react');
var ReactDOM = require('react-dom');
var PostHelper = require('../requests/post.js');
var DeleteHelper = require('../requests/delete.js');
var User = require('../models/users');
var _ = require('underscore');
var getVoteForUser = function(votes) {
  var userID = User.getID();
  return votes.filter(function(vote){
    return vote.user_id === userID;
  })[0].id;
}
var VoteIcon = React.createClass({
  voteHandler: function() {
    suggestionId = this.props.suggestion.id;
    if(this.props.suggestion.user_vote_status === 'no_vote') {
      PostHelper.upVoteSuggestion(suggestionId, User.getID());
    } else {
      var voteID = getVoteForUser(this.props.suggestion.votes);
      DeleteHelper.downVoteSuggestion(suggestionId, voteID);
    }  
  },
  arrowHelper: function() {
    if(this.props.suggestion.user_vote_status === 'voted_on_this') return 'fa fa-arrow-down';
    if(this.props.suggestion.user_vote_status === 'no_vote') return 'fa fa-arrow-up';
  },
  render: function() {
  	if(this.props.suggestion.user_vote_status === 'voted_on_other') {
  		return null;
  	} else {
	  	return (<i 
	  		className={this.arrowHelper()} 
	  		onClick={this.voteHandler}></i>
	  	);
  	}
  }
});

module.exports = VoteIcon;