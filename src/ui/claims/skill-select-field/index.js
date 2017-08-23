import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import skills, { findSkillById } from 'resources/skills';
// Taken from http://redux-form.com/7.0.0/examples/material-ui/ and modified according to our theme

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};

const skillWrapperStyle = { width: '6rem' };

const skillBadgeStyle = { width: '4rem', display: 'block' };

const selectionRenderer = (value) => {
  if (value) {
    const skill = findSkillById(value);
    return skill.name;
  }

  return '';
}

export default ({
  input,
  label,
  hint,
  meta: { touched, submitting, error },
  ...custom
}) => (
    <SelectField
      hintText={hint || label}
      floatingLabelText={label}
      errorText={(touched || submitting) && error}
      fullWidth
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      listStyle={listStyle}
      selectionRenderer={selectionRenderer}
      {...custom}>
      {skills.map(skill => <MenuItem key={skill.id} value={skill.id}>
        <div className="d-flex flex-column align-items-center p-2" style={skillWrapperStyle}>
          <img src={skill.badge} alt={skill.id} style={skillBadgeStyle} />
          {skill.name}
        </div>
      </MenuItem>)}
    </SelectField>
  );
