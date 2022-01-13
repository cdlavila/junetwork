'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('followers', [{
      id: '3aaa439a-6969-41e6-8de9-26bd99b14c09',
      follower_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      followed_id: '8d4169b9-673b-4819-8097-376548c51a15'
    }, {
      id: '5fc19d36-823e-4467-9f40-907fd658de3e',
      follower_id: '82afd153-cc39-42c7-9481-69f5162c3848',
      followed_id: '8d4169b9-673b-4819-8097-376548c51a15'
    }, {
      id: '9e31a2a1-2b25-4f37-84ff-e823e653c71a',
      follower_id: '8d4169b9-673b-4819-8097-376548c51a15',
      followed_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0'
    }, {
      id: 'ded58174-6260-4034-95b9-0f76da7c7eca',
      follower_id: '8d4169b9-673b-4819-8097-376548c51a15',
      followed_id: '82afd153-cc39-42c7-9481-69f5162c3848'
    }, {
      id: 'cf805380-6d8a-4c16-b4ec-8551eb915a45',
      follower_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      followed_id: '82afd153-cc39-42c7-9481-69f5162c3848'
    }, {
      id: '140e31a2-c77d-4ac1-81db-83c43bf7880b',
      follower_id: '82afd153-cc39-42c7-9481-69f5162c3848',
      followed_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0'
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('followers', null, {})
  }
}
