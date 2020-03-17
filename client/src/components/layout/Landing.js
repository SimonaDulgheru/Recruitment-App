import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<section className='desktop'>
			<div className='dark-overlay'>
				<div className='desktop-inner'>
					<h1 className='large'>SoftDev</h1>
					<p className='lead'>
						The Recruitment and Marketing Platform
					</p>
					<p className='lead-about'>
						The new way to Attract, Manage and Hire top talent
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
