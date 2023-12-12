// seeders/yyyyyy-seed-categories.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the 'Categories' table
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Nhạc sống',
          icon: 'https://i.imgur.com/YyXHyXv.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sân khấu - nghệ thuật',
          icon: 'https://i.imgur.com/ljaLmnS.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Nightlife',
          icon: 'https://i.imgur.com/U2PS6E6.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hội thảo',
          icon: 'https://i.imgur.com/l60bw3u.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tham quan du lịch',
          icon: 'https://i.imgur.com/7xTWoNU.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Khoá học',
          icon: 'https://i.imgur.com/fX2KeYU.png',
          type: 'EVENT',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more categories as needed
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the data added in the 'up' method
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
