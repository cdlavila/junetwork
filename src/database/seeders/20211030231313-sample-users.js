'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: '8d4169b9-673b-4819-8097-376548c51a15',
      name: 'Carlos Daniel Londoño Avila',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZO_WVXbxRGfF30LW1tFdTPGnrjSjPc4fWYN8YkLMAH_wvYxoAg_T6ky9wfkEXtDH-wM4&usqp=CAU',
      birthday: new Date('2001-08-10'), // YYYY-MM-DD
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniellondonoavila@gmail.com',
      password: bcrypt.hashSync('carlos123', 12)
    }, {
      id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      name: 'Lina Maria Londoño Avila',
      picture: 'https://static.wikia.nocookie.net/disney/images/1/13/Gal_Gadot.jpg/revision/latest?cb=20190105181535&path-prefix=es',
      birthday: new Date('1980-03-07'), // YYYY-MM-DD
      gender: 'female',
      phone: '3126233178',
      email: 'linamaria@gmail.com',
      password: bcrypt.hashSync('lina123', 12)
    }, {
      id: '82afd153-cc39-42c7-9481-69f5162c3848',
      name: 'Daniela Velarde Arana',
      picture: 'https://static.wikia.nocookie.net/doblaje/images/9/9b/Scarlet_Johansson_2019.jpg/revision/latest/top-crop/width/360/height/450?cb=20190423235236&path-prefix=es',
      birthday: new Date('2000-07-04'), // YYYY-MM-DD
      gender: 'female',
      phone: '3128236809',
      email: 'velarded44@gmail.com',
      password: bcrypt.hashSync('daniela123', 12)
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
