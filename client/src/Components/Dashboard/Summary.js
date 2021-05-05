import React from 'react';

function Summary(props) {
  const { title, value, average } = props;

  return (
    <section id="summary">
      <div className="row">
        <div className="five columns">
          <h3>{title}</h3>
        </div>

        <div className="four columns">
          <p>Your Total</p>
          <h3>{value}</h3>
        </div>

        <div className="three columns averages">
          <p>Average</p>
          <h5>{average}</h5>
        </div>
      </div>
    </section>
  );
}

export default Summary;
