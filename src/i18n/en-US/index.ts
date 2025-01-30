export default {
  project: {
    title: 'Office',
    description: 'Office management project',
  },
  failed: 'Action failed',
  success: 'Action was successful',
  pages: {
    index: {
      title: 'Welcome',
      description: 'This is the main page of our application',
    },
    about: {
      title: 'About Us',
      description:
        'Welcome to our application! We are dedicated to providing the best service possible. Our team is composed of experienced professionals who are passionate about what they do.',
      mission:
        'Our mission is to deliver high-quality products that meet the needs of our customers. We value feedback and are always looking for ways to improve.',
      contactButton: 'Contact Us',
    },
    contact: {
      title: 'Contact Us',
      description:
        'If you have any questions, feel free to reach out to us. We are here to help you and provide the best service possible.',
      emailInfo: 'You can contact us via email at',
      phoneInfo: 'or call us at',
      officeHours:
        'Our office hours are Monday to Friday, 9 AM to 5 PM. We look forward to hearing from you!',
      sendButton: 'Send Message',
    },
    error: {
      title: '404',
      description: 'Oops. Nothing here...',
      backButton: 'Go Home',
    },
  },
  components: {
    example: {
      title: 'Example component',
      count: 'Count: {count} / {total}',
      active: {
        yes: 'yes',
        no: 'no',
      },
      clicks: 'Clicks on todos:',
    },
    essential: {
      title: 'Essential Link',
    },
    internal: {
      title: 'Internal Link',
    },
    layoutCustomizer: {
      title: 'Layout Customizer',
      leftDrawer: 'Left Drawer',
      rightDrawer: 'Right Drawer',
      settings: {
        title: 'Settings',
        theme: {
          label: 'Theme Dark',
          light: 'Light',
          dark: 'Dark',
          caption: 'Toggle between light and dark theme',
        },
        language: {
          label: 'Language',
          english: 'English',
          portuguese: 'Portuguese',
        },
        menu: {
          label: 'Menu Horizontal',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
          caption: 'Toggle between horizontal and vertical menu',
        },
      },
      close: 'Close',
    },
    mainLayout: {
      menu: {
        internalLinks: 'Internal Links',
        essentialLinks: 'Essential Links',
      },
      profile: {
        profile: 'Profile',
        logout: 'Logout',
      },
      footer: {
        copyright: '© 2023 Your Company. All rights reserved.',
      },
    },
  },
}
