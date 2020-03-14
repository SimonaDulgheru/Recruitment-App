import React from "react";
import PropTypes from "prop-types";
//Anytime we want to interact with Redux we need to call/import connect
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<div key={alert.id} className={`alert alert-${alert.alertType}`}>
			{alert.msg}
		</div>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

//We mapping Redux State to a prop in this component so we can have acces to it

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
