'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('posts', [{
      id: '4f2dfaf4-2a87-4713-82c2-c5fbcd9e2c2e',
      body: 'Miren mi hermoso cachorro',
      image: 'https://estag.fimagenes.com/img/4/3/F/R/3FR_1024.jpg',
      user_id: '8d4169b9-673b-4819-8097-376548c51a15',
      creation_date: new Date()
    }, {
      id: 'e40ed3d4-0985-4cb8-92ca-ec249dbb4b83',
      body: 'Fue un viaje maravilloso',
      image: 'https://wp-growpro.s3-eu-west-1.amazonaws.com/media/2020/03/Que-llevar-a-un-viaje.jpg',
      user_id: 'fce08757-00e4-4566-9042-1c3de54ff5b0',
      creation_date: new Date()
    }, {
      id: 'b1cf8feb-2db3-4da5-b7ad-5751339e9636',
      body: 'Amo leer',
      image: 'https://image.freepik.com/foto-gratis/retrato-mujer-leyendo-libro_23-2148758192.jpg',
      user_id: '82afd153-cc39-42c7-9481-69f5162c3848',
      creation_date: new Date()
    }], {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('posts', null, {})
  }
}
