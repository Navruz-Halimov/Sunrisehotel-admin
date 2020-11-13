export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Asosiy panel',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Amenties',
        to: '/amenty',
        icon: 'cil-star',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Events',
        to: '/event',
        icon:'cil-task'

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Gallery',
        to: '/gallery',
        icon: 'cil-task',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Menu',
        to: '/menu',
        icon: 'cil-star',

      },
      {
        _name: "CSidebarNavItem",
        name: 'Offers',
        to: '/offers',
        icon:'cil-task'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'MenuOffer',
        to: '/menu-offer',
        icon:'cil-task'

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reservation',
        to: '/reservation',
        icon:'cil-calendar',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Customer',
        to: '/customer',
        icon: 'cilUser',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reviews',
        to: '/reviews',
        icon: 'cil-star',

      },
      {
        _name: 'CSidebarNavItem',
        name: 'Rooms',
        to: '/room',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Discount',
        to: '/discount',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Menu',
        route: '/header',
        icon: 'cil-star',
        items: [
          {
            name: 'Header slider',
            to: '/header/header-slider',
          },
          {
            name: 'Brands',
            to: '/icons/brands'
          },
          {
            name: 'Flags',
            to: '/icons/flags'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Notifications',
        route: '/notifications',
        icon: 'cil-bell',
        items: [
          {
            name: 'Alerts',
            to: '/notifications/alerts'
          },
          {
            name: 'Badges',
            to: '/notifications/badges'
          },
          {
            name: 'Modals',
            to: '/notifications/modals'
          }
        ]
      },
    ],
  },
]