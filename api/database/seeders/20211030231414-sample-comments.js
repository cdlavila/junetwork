'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('comments', [{
      id: 'aed2b421-a62b-47ff-b1cf-a7558edefbb8',
      body: 'Esta precioso 😍',
      post_id: '4f2dfaf4-2a87-4713-82c2-c5fbcd9e2c2e',
      user_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      creation_date: new Date()
    }, {
      id: '96fd6a46-61fb-4544-8b10-8c88d723945c',
      body: 'Me alegra por ti ❤',
      post_id: 'e40ed3d4-0985-4cb8-92ca-ec249dbb4b83',
      user_id: '82afd153-cc39-42c7-9481-69f5162c3848',
      creation_date: new Date()
    }, {
      id: '3e51a2a1-2b25-4f37-84ff-e823e653c86a',
      body: 'Yo también amo leer',
      post_id: 'b1cf8feb-2db3-4da5-b7ad-5751339e9636',
      user_id: '8d4169b9-673b-4819-8097-376548c51a15',
      creation_date: new Date()
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comments', null, {})
  }
}
