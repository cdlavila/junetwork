'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: '8d4169b9-673b-4819-8097-376548c51a15',
      name: 'Carlos Daniel Londoño Avila',
      birthday: new Date('2001-08-10'), // YYYY-MM-DD
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniellondonoavila@gmail.com',
      password: '$2b$10$idBDtYf.D3CFeHV1Spm.COrQ9gagnRLT081TLw6eGHTcKSjc1Z7Ba',
      creation_date: new Date()
    }, {
      id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      name: 'Lina Maria Londoño Avila',
      birthday: new Date('1980-03-07'), // YYYY-MM-DD
      gender: 'female',
      phone: '3126233178',
      email: 'linamaria@gmail.com',
      password: '$2b$10$Sa8GfclDuwPDGxHXXEwOVOjcdq7GiBQb/CHFRkP1TrlYRan9J0alm',
      creation_date: new Date()
    }, {
      id: '82afd153-cc39-42c7-9481-69f5162c3848',
      name: 'Daniela Velarde Arana',
      birthday: new Date('2000-07-04'), // YYYY-MM-DD
      gender: 'female',
      phone: '3128236809',
      email: 'velarded44@gmail.com',
      password: '$2b$10$R.rI/xj0sdbSmJsk5oTeqOTm6dNFeYU973mFFKgjLjWNZqfq.YCJ6',
      creation_date: new Date()
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
