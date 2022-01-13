'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('reactions', [{
      id: '297984b3-4543-48f0-a191-7e7e01ec1dc8',
      emoji: 'like',
      post_id: '4f2dfaf4-2a87-4713-82c2-c5fbcd9e2c2e',
      user_id: '8d4169b9-673b-4819-8097-376548c51a15'
    }, {
      id: '30168326-a39c-4289-890d-b414e9abcc08',
      emoji: 'love',
      post_id: '4f2dfaf4-2a87-4713-82c2-c5fbcd9e2c2e',
      user_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0'
    }, {
      id: 'c1a127a9-b4fa-4720-b833-e695759dbdf6',
      emoji: 'haha',
      post_id: '4f2dfaf4-2a87-4713-82c2-c5fbcd9e2c2e',
      user_id: '82afd153-cc39-42c7-9481-69f5162c3848'
    }, {
      id: '051caa67-7fa2-4d9f-aa2e-1deaa58420fb',
      emoji: 'like',
      post_id: 'e40ed3d4-0985-4cb8-92ca-ec249dbb4b83',
      user_id: '8d4169b9-673b-4819-8097-376548c51a15'
    }, {
      id: 'd9e77528-d90f-43c2-aec1-3d6b8d0755ec',
      emoji: 'care',
      post_id: 'e40ed3d4-0985-4cb8-92ca-ec249dbb4b83',
      user_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0'
    }, {
      id: 'b4070053-00e1-4b2e-9375-941f7f3dab13',
      emoji: 'wow',
      post_id: 'e40ed3d4-0985-4cb8-92ca-ec249dbb4b83',
      user_id: '82afd153-cc39-42c7-9481-69f5162c3848'
    }, {
      id: '02e999e6-1271-4361-9ab6-078763c151f6',
      emoji: 'love',
      post_id: 'b1cf8feb-2db3-4da5-b7ad-5751339e9636',
      user_id: '8d4169b9-673b-4819-8097-376548c51a15'
    }, {
      id: '0b15c0b6-34b7-49e6-b3fe-a55d5482a547',
      emoji: 'sad',
      post_id: 'b1cf8feb-2db3-4da5-b7ad-5751339e9636',
      user_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0'
    }, {
      id: '86e77a04-bdcb-409a-b11c-23d397ac0d56',
      emoji: 'angry',
      post_id: 'b1cf8feb-2db3-4da5-b7ad-5751339e9636',
      user_id: '82afd153-cc39-42c7-9481-69f5162c3848'
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('reactions', null, {})
  }
}

