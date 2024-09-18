import React from 'react';
import PropTypes from 'prop-types';
import './ActionLogDisplay.css';

interface ActionLogDisplayProps {
  log: string;
}

const ActionLogDisplay: React.FC<ActionLogDisplayProps> = ({ log }) => {
  return (
    <div className="log-text-body">
      {log}
    </div>
  );
};

ActionLogDisplay.propTypes = {
  log: PropTypes.string.isRequired
};

export default ActionLogDisplay;