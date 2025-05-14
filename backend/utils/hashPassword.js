const bcrypt = require('bcryptjs');
const express = require('express');

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10); 
  return bcrypt.hash(plainPassword, salt); 
};

module.exports = hashPassword;