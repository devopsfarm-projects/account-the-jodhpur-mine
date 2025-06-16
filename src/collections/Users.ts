import type { CollectionConfig } from 'payload'

export type UserRole = 'admin' | 'manager' | 'guest'

export interface User {
  id: string
  email: string
  role: UserRole
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },


  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user || !('role' in user)) return false;
      return user.role === 'admin' || user.role === 'manager';
    },
    delete: ({ req: { user } }) => {
      if (!user || !('role' in user)) return false;
      return user.role === 'admin';
    },
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'guest',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Guest', value: 'guest' }
      ],
      required: true,
    }
  ]
}
