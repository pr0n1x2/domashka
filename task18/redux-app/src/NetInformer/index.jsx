import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.modules.scss';

class NetInformer extends Component {
    render() {
        const { isOnline } = this.props;
        return isOnline ? '' : <div className="NetInformer">Server connection lost</div>
    }
}

NetInformer.propTypes = {
    isOnline: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isOnline: state.app.isOnline,
});

export default connect(mapStateToProps)(NetInformer);