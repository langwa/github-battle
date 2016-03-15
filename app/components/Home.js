var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    transparentBg = require('../styles').transparentBg;

var Home = React.createClass({
    render: function() {
        return (
            <div
                className='jumbotron col-sm-12 text-center'
                style={transparentBg}>
                <h1>Github Battle</h1>
                <p className='lead'>Some fancy motto</p>
                <Link to='/playerOne'>
                    <button
                        type='button'
                        className = 'btn btn-lg btn-success'>
                        Get Started
                    </button>
                </Link>
            </div>
        );
    }
});

module.exports = Home;