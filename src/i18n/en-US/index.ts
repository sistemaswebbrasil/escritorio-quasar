export default {
  project: {
    title: 'Office',
    description: 'Office management project',
  },
  failed: 'Action failed',
  fields: {
    id: 'ID',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
    title: 'Title',
    description: 'Description',
    status: 'Status',
    actions: 'Actions',
  },
  enums: {
    taskStatus: {
      TODO: 'To Do',
      IN_PROGRESS: 'In Progress',
      DONE: 'Done',
    },
  },
  success: {
    create: 'Successfully created',
    createId: 'Record {id} created successfully',
    update: 'Successfully updated',
    updateId: 'Record {id} updated successfully',
    delete: 'Successfully deleted',
    deleteId: 'Record {id} deleted successfully',
  },
  error: {
    generic: {
      title: 'Error',
      message: 'An unexpected error occurred',
    },
    required: 'Field required',
    create: 'Failed to create',
    update: 'Failed to update',
    updateId: 'Failed to update record {id}',
    delete: 'Failed to delete',
    deleteId: 'Failed to delete record {id}',
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
        'Welcome to our application! We are dedicated to delivering the best possible service. Our team consists of experienced professionals who are passionate about what they do.',
      mission:
        'Our mission is to deliver high-quality products that meet the needs of our customers. We value feedback and are always looking for ways to improve.',
      contactButton: 'Contact Us',
      caption: 'Learn more about us',
    },
    tasks: {
      title: 'Tasks',
      description: 'Here you can view all available tasks',
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
          done: 'Completed',
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
        'If you have any questions, do not hesitate to contact us. We are here to help you and provide the best possible service.',
      emailInfo: 'You can reach us by email at',
      phoneInfo: 'or call',
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
      leftDrawer: 'Left Sidebar Menu',
      rightDrawer: 'Right Sidebar Menu',
      settings: {
        title: 'Settings',
        theme: {
          label: 'Dark Theme',
          light: 'Light',
          dark: 'Dark',
          caption: 'Switch between light and dark themes',
        },
        language: {
          label: 'Language',
          english: 'English',
          portuguese: 'Portuguese',
        },
        menu: {
          label: 'Horizontal Menu',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
          caption: 'Switch between horizontal and vertical menus',
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
        logout: 'Log Out',
      },
      footer: {
        copyright: '© 2023 Your Company. All rights reserved.',
      },
    },
  },
}
