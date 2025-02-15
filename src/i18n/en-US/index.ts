export default {
  project: {
    title: 'Office',
    description: 'Office management project',
  },
  failed: 'Action failed',
  success: {
    create: 'Created successfully',
    createId: 'Record created with id {id}',
    update: 'Updated successfully',
    updateId: 'Record with id {id} updated successfully',
    delete: 'Deleted successfully',
    deleteId: 'Record with id {id} deleted successfully',
  },
  error: {
    generic: {
      title: 'Error',
      message: 'An unexpected error occurred',
    },
    required: 'Required field',
    create: 'Failed to create',
    update: 'Failed to update',
    updateId: 'Failed to update record with id {id}',
    delete: 'Failed to delete',
    deleteId: 'Failed to delete record with id {id}',
  },

  confirm: {
    generic: {
      title: 'Confirmation',
      message: 'Are you sure you want to perform this action?',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
  },
  pages: {
    index: {
      title: 'Home',
      description: 'This is the main page of our application',
      caption: 'Welcome to our application!',
    },
    about: {
      title: 'About Us',
      description:
        'Welcome to our application! We are dedicated to providing the best service possible. Our team is composed of experienced professionals passionate about what they do.',
      mission:
        "Our mission is to deliver high-quality products that meet our customers' needs. We value feedback and are always looking for ways to improve.",
      contactButton: 'Contact Us',
      caption: 'Learn more about us',
    },
    tasks: {
      title: 'Tasks',
      description: 'Here you can see all available tasks',
      caption: 'Tasks',
      newTask: 'New Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      action: {
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        cancel: 'Cancel',
      },
      task: {
        title: 'Title',
        description: 'Description',
        status: 'Status',
        statusOptions: {
          pending: 'Pending',
          inProgress: 'In Progress',
          done: 'Done',
        },
        actions: 'Actions',
        delete: 'Delete',
        new: {
          title: 'New Task',
          submit: 'Create',
        },
        edit: {
          title: 'Edit Task',
          submit: 'Save',
        },
        confirmDelete: {
          title: 'Delete Task',
          message: 'Are you sure you want to delete this task?',
          confirm: 'Delete',
          cancel: 'Cancel',
        },
      },
    },
    contact: {
      title: 'Contact',
      description:
        'If you have any questions, do not hesitate to contact us. We are here to help you and provide the best service possible.',
      emailInfo: 'You can contact us via email at',
      phoneInfo: 'or call us at',
      officeHours:
        'Our office hours are Monday to Friday, from 9 AM to 5 PM. We look forward to hearing from you!',
      sendButton: 'Send Message',
      caption: 'Get in touch with us',
    },
    error: {
      title: '404',
      description: 'Oops. Nothing here...',
      backButton: 'Back to Home',
    },
  },
  components: {
    example: {
      title: 'Example Component',
      count: 'Count: {count} / {total}',
      active: {
        yes: 'yes',
        no: 'no',
      },
      clicks: 'Clicks on all:',
    },
    essential: {
      title: 'Essential Link',
    },
    internal: {
      title: 'Internal Link',
    },
    layoutCustomizer: {
      title: 'Customize Layout',
      leftDrawer: 'Left Drawer',
      rightDrawer: 'Right Drawer',
      settings: {
        title: 'Settings',
        theme: {
          label: 'Dark Theme',
          light: 'Light',
          dark: 'Dark',
          caption: 'Toggle between light and dark themes',
        },
        language: {
          label: 'Language',
          english: 'English',
          portuguese: 'Portuguese',
        },
        menu: {
          label: 'Menu Orientation',
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
